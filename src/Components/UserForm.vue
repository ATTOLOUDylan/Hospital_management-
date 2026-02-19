<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['userToEdit']);
const emit = defineEmits(['save-user', 'cancel-edit']);

const user = ref({ name: '', email: '', password: '', role: 'Médecin' });

watch(() => props.userToEdit, (newVal) => {
  if (newVal) user.value = { ...newVal };
  else reset();
}, { immediate: true });

function reset() {
  user.value = { name: '', email: '', password: '', role: 'Médecin' };
  emit('cancel-edit');
}

const submitForm = () => {
  emit('save-user', { 
    ...user.value, 
    id: user.value.id || Date.now() 
  });
  reset();
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
    <h3 class="text-xl font-bold mb-4">{{ user.id ? 'Modifier' : 'Créer' }} un compte</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input v-model="user.name" type="text" placeholder="Nom complet" class="w-full p-2 border rounded" required>
      <input v-model="user.email" type="email" placeholder="Email" class="w-full p-2 border rounded" required>
      
      <input 
        v-model="user.password" 
        type="password" 
        placeholder="Mot de passe" 
        class="w-full p-2 border rounded" 
        :required="!user.id"
      >
      
      <select v-model="user.role" class="w-full p-2 border rounded">
        <option value="Médecin">Médecin</option>
        <option value="Réceptionniste">Réceptionniste</option>
      </select>

      <div class="flex gap-2">
        <button type="submit" class="bg-[#1E8E6E] text-white px-4 py-2 rounded flex-1">Enregistrer</button>
        <button v-if="user.id" @click="reset" type="button" class="bg-gray-200 px-4 py-2 rounded">Annuler</button>
      </div>
    </form>
  </div>
</template>>
