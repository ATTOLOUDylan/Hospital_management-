<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import bcrypt from "bcryptjs";

const props = defineProps(['userToEdit']);
const emit = defineEmits(['save-user', 'cancel-edit']);

// Initialisation par défaut
const user = ref({ name: '', email: '', password: '', role: 'doctor' });
const allDoctors = ref([]);
const existingUsers = ref([]);

const loadData = () => {
  allDoctors.value = JSON.parse(localStorage.getItem('doctors') || '[]');
  existingUsers.value = JSON.parse(localStorage.getItem('db_users') || '[]');
};

onMounted(loadData);

watch(() => props.userToEdit, (newVal) => {
  loadData();
  if (newVal) {
    user.value = { ...newVal, name: newVal.Name || newVal.name, password: '' };
  } else {
    reset();
  }
}, { immediate: true });

// Reset le nom si on change de rôle pour éviter les conflits
watch(() => user.value.role, (newRole, oldRole) => {
  if (!props.userToEdit) user.value.name = '';
});

// Médecins disponibles (Annuaire - Utilisateurs existants)
const availableDoctors = computed(() => {
  return allDoctors.value.filter(doc => {
    const alreadyHasAccount = existingUsers.value.some(u => {
      const nameInDb = u.Name || u.name;
      return nameInDb?.toLowerCase().trim() === doc.name?.toLowerCase().trim();
    });
    if (props.userToEdit && (props.userToEdit.Name === doc.name || props.userToEdit.name === doc.name)) return true;
    return !alreadyHasAccount;
  });
});

// Vérification si le nom de réceptionniste existe déjà
const isNameTaken = computed(() => {
  if (user.value.role === 'doctor' || !user.value.name) return false;
  return existingUsers.value.some(u => {
    // On ignore la vérification pour l'utilisateur en cours d'édition
    if (props.userToEdit && (u.id === props.userToEdit.id)) return false;
    const nameInDb = u.Name || u.name;
    return nameInDb?.toLowerCase().trim() === user.value.name?.toLowerCase().trim();
  });
});

function reset() {
  user.value = { name: '', email: '', password: '', role: 'doctor' };
  emit('cancel-edit');
}

const submitForm = () => {
  if (isNameTaken.value) return; // Sécurité supplémentaire

  const userData = { ...user.value };
  
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);
  } else if (props.userToEdit) {
    userData.password = props.userToEdit.password;
  }

  emit('save-user', { 
    ...userData, 
    Name: userData.name, 
    id: userData.id || Date.now() 
  });
  reset();
};
</script>

<template>
  <div class="bg-white p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-gray-100 transition-all duration-500">
    <div class="flex items-center gap-3 mb-8">
      <div class="p-3 bg-emerald-50 rounded-xl text-[#1E8E6E]">
        <svg v-if="!user.id" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
      </div>
      <h3 class="text-xl font-black text-gray-800 tracking-tight">
        {{ user.id ? 'Modifier' : 'Créer' }} <span class="text-[#1E8E6E]">Compte</span>
      </h3>
    </div>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      
      <div class="group">
        <label class="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-[#1E8E6E] transition-colors">Rôle de l'utilisateur</label>
        <div class="relative">
          <select v-model="user.role" class="w-full p-3.5 bg-gray-50 border-2 border-gray-50 rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-[#1E8E6E] focus:ring-4 focus:ring-emerald-50 outline-none transition-all appearance-none cursor-pointer">
            <option value="doctor">Médecin</option>
            <option value="Receptionniste">Réceptionniste</option>
          </select>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      <div class="group">
        <label class="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-[#1E8E6E] transition-colors">Nom complet</label>
        
        <div v-if="user.role === 'doctor'" class="relative">
          <select 
            v-model="user.name" 
            class="w-full p-3.5 bg-gray-50 border-2 border-gray-50 rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-[#1E8E6E] focus:ring-4 focus:ring-emerald-50 outline-none transition-all appearance-none cursor-pointer" 
            required
          >
            <option value="" disabled>-- Sélectionner le médecin --</option>
            <option v-for="doc in availableDoctors" :key="doc.id" :value="doc.name">
              Dr. {{ doc.name }}
            </option>
          </select>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
          </div>
        </div>

        <div v-else class="relative">
          <input 
            v-model="user.name" 
            type="text" 
            placeholder="Ex: Jean Dupont" 
            class="w-full p-3.5 bg-gray-50 border-2 border-gray-50 rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-[#1E8E6E] focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
            :class="{'border-red-200 bg-red-50': isNameTaken}"
            required
          >
          <p v-if="isNameTaken" class="flex items-center gap-1 text-red-500 text-[11px] font-bold mt-2 ml-1">
             <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
             Ce nom est déjà utilisé
          </p>
        </div>
        
        <p v-if="user.role === 'doctor' && availableDoctors.length === 0 && !user.id" class="text-amber-600 bg-amber-50 p-3 rounded-xl text-[11px] font-medium mt-3 border border-amber-100 leading-tight">
          ⚠️ Tous les médecins ont déjà un compte.
        </p>
      </div>

      <div class="space-y-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
        <div class="group">
          <label class="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Email</label>
          <input v-model="user.email" type="email" placeholder="email@exemple.com" class="w-full p-3 bg-white border-2 border-gray-100 rounded-xl text-sm focus:border-[#1E8E6E] outline-none transition-all" required>
        </div>
        <div class="group">
          <label class="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Mot de passe</label>
          <input 
            v-model="user.password" 
            type="password" 
            placeholder="••••••••" 
            class="w-full p-3 bg-white border-2 border-gray-100 rounded-xl text-sm focus:border-[#1E8E6E] outline-none transition-all" 
            :required="!user.id"
          >
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <button 
          type="submit" 
          class="flex-[2] bg-[#1E8E6E] hover:bg-[#166b53] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-30 disabled:grayscale disabled:pointer-events-none"
          :disabled="(user.role === 'doctor' && availableDoctors.length === 0 && !user.id) || isNameTaken"
        >
          {{ user.id ? 'Mettre à jour' : 'Enregistrer' }}
        </button>
        <button v-if="user.id" @click="reset" type="button" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all">
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Ajout d'une police système propre si non définie globalement */
form {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>