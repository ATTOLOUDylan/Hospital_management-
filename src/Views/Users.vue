<script setup>
import { ref, onMounted } from 'vue';
import { authService } from '@/Service/authServices';
import UserForm from "@/Components/UserForm.vue";
import UserList from "@/Components/UserList.vue";

const STORAGE_KEY = 'db_users';
const users = ref([]);
const userToEdit = ref(null);

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
  } else {
    users.value.push({ 
      ...finalUser, 
      id: userData.id || Date.now() 
    });
  }
  saveToStorage();
  userToEdit.value = null;
};

const handleDelete = (id) => {
  const userToDelete = users.value.find(u => u.id === id);
  if (userToDelete?.role === 'Admin') return;

  if(confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    users.value = users.value.filter(u => u.id !== id);
    saveToStorage();
  }
};

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value));
};
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <div class="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Gestion des Utilisateurs</h1>
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
              <div class="flex gap-2">
                <span class="p-2 bg-white rounded-lg border border-gray-100 text-gray-400">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
              </div>
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
  </div>
</template>

<style scoped>
/* Petit effet de transition globale */
div {
  transition: all 0.3s ease;
}
</style>