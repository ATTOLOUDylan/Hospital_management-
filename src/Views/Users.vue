<script setup>
import { ref, onMounted, watch } from 'vue';
import { authService } from '@/Service/authServices';
import UserForm from "@/Components/UserForm.vue";
import UserList from "@/Components/UserList.vue";
import Modal from "@/Components/Modal.vue";
import Notification from "@/Components/Notification.vue"; // 1. IMPORT

const STORAGE_KEY = 'db_users';
const users = ref([]);
const userToEdit = ref(null);

// États pour les modaux
const showDeleteModal = ref(false);
const userToDelete = ref(null);

// --- LOGIQUE NOTIFICATION ---
const notification = ref({ message: '', type: 'success' });
const triggerNotify = (msg, type = 'success') => {
  notification.value.message = msg;
  notification.value.type = type;
  setTimeout(() => { notification.value.message = ''; }, 3000);
};

onMounted(() => {
  users.value = authService.getUsers();
});

const handleSave = (userData) => {
  const index = users.value.findIndex(u => u.id === userData.id);
  const finalUser = {
    ...userData,
    Name: userData.Name || userData.name 
  };

  if (index !== -1) {
    users.value[index] = finalUser;
    triggerNotify("Utilisateur mis à jour !"); // NOTIF
  } else {
    users.value.push({ 
      ...finalUser, 
      id: userData.id || Date.now() 
    });
    triggerNotify("Utilisateur créé avec succès !"); // NOTIF
  }
  saveToStorage();
  userToEdit.value = null;
};

const handleDelete = (id) => {
  const user = users.value.find(u => u.id === id);
  if (user?.role === 'Admin') {
    triggerNotify("Impossible de supprimer un Admin", "error");
    return;
  }

  userToDelete.value = user;
  showDeleteModal.value = true;
};

const executeDelete = () => {
  if (userToDelete.value) {
    users.value = users.value.filter(u => u.id !== userToDelete.value.id);
    saveToStorage();
    triggerNotify("Utilisateur supprimé", "error"); // NOTIF
  }
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value));
};
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
    
    <Notification :message="notification.message" :type="notification.type" />

    <div class="max-w-7xl mx-auto">
      
      <div class="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight italic uppercase">Gestion des Utilisateurs</h1>
          <p class="text-gray-500 mt-1 font-medium">Contrôlez les accès et les rôles du personnel hospitalier.</p>
        </div>
        
        <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
          <div class="h-3 w-3 rounded-full bg-[#1E8E6E] animate-pulse"></div>
          <span class="text-sm font-bold text-gray-700">{{ users.length }} Comptes actifs</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-4 sticky top-8">
          <div class="relative">
            <div class="absolute -top-4 -left-4 w-24 h-24 bg-[#1E8E6E]/10 rounded-full blur-2xl"></div>
            
            <UserForm 
              :userToEdit="userToEdit" 
              @save-user="handleSave" 
              @cancel-edit="userToEdit = null" 
              class="relative z-10"
            />
          </div>
        </div>

        <div class="lg:col-span-8">
          <div class="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <h2 class="text-lg font-bold text-gray-800">Liste du personnel</h2>
            </div>

            <UserList 
              :users="users" 
              @edit-user="(u) => userToEdit = u" 
              @delete-user="handleDelete" 
            />
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <Modal v-if="showDeleteModal" @close="showDeleteModal = false">
        <div class="text-center p-4">
          <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic">Confirmation</h3>
          <p class="text-slate-500 font-medium mb-8">
            Voulez-vous supprimer l'utilisateur <span class="text-slate-900 font-bold underline">{{ userToDelete?.Name }}</span> ?
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="showDeleteModal = false" class="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">Annuler</button>
            <button @click="executeDelete" class="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all">Supprimer</button>
          </div>
        </div>
      </Modal>
    </transition>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>