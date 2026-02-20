<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'success' // 'success', 'error', 'info'
  }
});
</script>

<template>
  <div class="fixed bottom-10 right-10 z-[100] pointer-events-none">
    <transition name="slide">
      <div v-if="message" 
           :class="[
             'flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl font-black text-white uppercase tracking-wider italic animate-pulse',
             type === 'success' ? 'bg-[#1E8E6E]' : 'bg-rose-500'
           ]">
        <div class="bg-white/20 p-2 rounded-lg">
          <svg v-if="type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </div>
        
        <span>{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.slide-enter-from { transform: translateX(100%) scale(0.5); opacity: 0; }
.slide-leave-to { transform: translateY(20px); opacity: 0; }
</style>