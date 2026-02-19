<!-- Modal.vue -->
<template>
  <div 
    class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    @click.self="close"
  >
    <div class="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/20 transform transition-all border border-slate-100">
      
      <button 
        @click="close"
        class="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all group"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="mt-2">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>