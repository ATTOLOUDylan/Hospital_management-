<script setup>
import { ref, onMounted } from 'vue';
import UserForm from "@/Components/UserForm.vue";
import UserList from "@/Components/UserList.vue";

const STORAGE_KEY = 'db_users';
const users = ref([]);
const userToEdit = ref(null);

// Charger les données au démarrage
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  users.value = saved ? JSON.parse(saved) : [];
});

// Sauvegarder et mettre à jour la liste
const handleSave = (userData) => {
  const index = users.value.findIndex(u => u.id === userData.id);
  if (index !== -1) {
    users.value[index] = { ...userData };
  } else {
    users.value.push({ ...userData });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value));
  userToEdit.value = null; // Reset le mode édition
};

const handleDelete = (id) => {
  if(confirm("Supprimer cet utilisateur ?")) {
    users.value = users.value.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value));
  }
};
</script>

<template>
  <div class="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-1">
      <UserForm 
        :userToEdit="userToEdit" 
        @save-user="handleSave" 
        @cancel-edit="userToEdit = null" 
      />
    </div>
    <div class="lg:col-span-2">
      <UserList 
        :users="users" 
        @edit-user="(u) => userToEdit = u" 
        @delete-user="handleDelete" 
      />
    </div>
  </div>
</template>
