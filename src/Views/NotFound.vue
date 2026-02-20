<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-lg w-full text-center">
      <div class="relative mb-8">
        <h1 class="text-[12rem] font-black text-slate-200 leading-none select-none">
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-6xl animate-bounce">🚑</span>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-3xl font-black text-slate-800 tracking-tight italic uppercase">
          Urgence ! Page introuvable
        </h2>
        <p class="text-slate-500 font-medium text-lg">
          Il semblerait que le docteur que vous cherchez soit en intervention... ou que cette page n'ait jamais existé.
        </p>
      </div>

      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          @click="goBack" 
          class="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all transform active:scale-95 shadow-sm"
        >
          Retourner en arrière
        </button>
        
      </div>

      <div class="mt-16 pt-8 border-t border-slate-100">
        <p class="text-slate-400 text-sm font-bold uppercase tracking-widest">
          Système de Gestion Médicale v1.0
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Petit effet de flottement sur le gros 404 */
h1 {
  text-shadow: 4px 4px 0px rgba(255, 255, 255, 1);
}

@keyframes bounce {
  0%, 100% { transform: translateY(-10%) rotate(-5deg); }
  50% { transform: translateY(10%) rotate(5deg); }
}

.animate-bounce {
  animation: bounce 3s ease-in-out infinite;
}
</style>