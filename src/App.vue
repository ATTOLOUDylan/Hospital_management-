<script setup>
import Navbar from './Layout/Navbar.vue';
import Sidebar from './Layout/Sidebar.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
    
    <header v-if="!route.meta.hideNav" class="w-full sticky top-0 z-50">
      <Navbar />
    </header>

    <div class="flex flex-1 relative">
      
      <aside v-if="!route.meta.hideNav" class="w-64 lg:w-72 hidden lg:block shrink-0 border-r border-gray-200">
        <Sidebar />
      </aside>

      <main 
        class="flex-1 flex flex-col min-w-0 overflow-x-hidden"
        :class="[!route.meta.hideNav ? 'p-6 lg:p-10' : 'p-0']"
      >
        
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </RouterView>

      </main>
    </div>
  </div>
</template>

<style>
/* Tes styles restent identiques */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* ... reste de la scrollbar ... */
</style>