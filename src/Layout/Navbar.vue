<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authService } from '@/Service/authServices';

const router = useRouter();
const route = useRoute();
const user = ref(null);

// 1. Fonction pour charger l'utilisateur proprement
const getUserData = () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
};

// 2. EXÉCUTION IMMÉDIATE (Dès que le composant est initialisé)
getUserData();

// 3. AU MONTAGE (Par sécurité)
onMounted(() => {
  getUserData();
});

// 4. SURVEILLANCE (Si l'utilisateur change de page ou se reconnecte)
watch(
  () => route.path,
  () => {
    getUserData();
  }
);

const isLoggedOut = () => {
  authService.logOut();
  user.value = null;
  router.push("/");
};
</script>

<template>
  <nav v-if="!$route.meta.hideNav" class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
    
    <div class="w-full px-8 h-20 flex items-center justify-between">
      
      <div class="flex items-center gap-3">
        <div class="bg-[#1E8E6E] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-[#1E8E6E]/20">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 16.5L13 16.5V13H11V16.5H8V8.5H11V11H13V8.5H16V16.5Z" fill="currentColor"/>
          </svg>
        </div>
        <h1 class="text-xl font-extrabold text-gray-800 tracking-tight">
          Harmony<span class="text-[#1E8E6E]">Health</span>
        </h1>
      </div>

      <div class="flex items-center gap-6" v-if="user">
        <div class="flex items-center gap-3 pr-6 border-r border-gray-100">
          <div class="text-right hidden sm:block">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Session active</p>
            <p class="text-sm font-semibold text-gray-700 leading-tight">{{ user.Name }}</p>
          </div>
          <div class="w-11 h-11 rounded-full border-2 border-[#1E8E6E]/10 p-0.5 overflow-hidden transition-transform hover:scale-105 cursor-pointer">
            <img 
              :src="`https://ui-avatars.com/api/?name=${user.Name}&background=1E8E6E&color=fff`" 
              class="w-full h-full rounded-full object-cover"
              alt="Profile"
            >
          </div>
        </div>

        <button 
          @click="isLoggedOut" 
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 font-bold text-sm transition-all active:scale-95 border border-red-100"
        >
          <span class="hidden md:inline">Déconnexion</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </nav>

  </template>

