<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/Service/authServices";

const router = useRouter();

const Name = ref("");
const password = ref("");
const errorMessage = ref("");

function login() {
  errorMessage.value = "";
  const connected = authService.login({
    Name: Name.value,
    password: password.value,
  });

  if (connected) {
    router.push("/home");
  } else {
    errorMessage.value = "Email ou mot de passe incorrect";
  }
}
</script>

<template>
  <div
    class="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style="background-image: url('/src/assets/image1.jpg');"
  >
    
    <div class="absolute inset-0 bg-[#1E8E6E]/20 backdrop-blur-[1px]"></div>

    <div class="relative z-10 auth-card bg-white/95 shadow-2xl rounded-3xl w-full max-w-md p-10 border border-white/40">
      
      <header class="auth-header text-center mb-8">
        <div class="logo mx-auto mb-5 bg-[#1E8E6E]/10 w-20 h-20 flex items-center justify-center rounded-2xl text-[#1E8E6E]">
          <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h3M7 14h5" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Bienvenue</h1>
        <p class="text-gray-500 mt-2 font-medium">Prêt pour une nouvelle journée à<span class="text-[#1E8E6E]"> HHC ?</span></p>
      </header>

      <form @submit.prevent="login" class="auth-form space-y-6">
        <div class="field-group">
          <label for="name" class="block text-sm text-gray-700 font-semibold mb-2">Nom d'utilisateur</label>
          <input
            v-model="Name"
            type="text"
            id="name"
            placeholder="Ex: Jean Dupont"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E8E6E] focus:bg-white transition-all duration-200"
          />
        </div>

        <div class="field-group">
          <label for="password" class="block text-sm text-gray-700 font-semibold mb-2">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E8E6E] focus:bg-white transition-all duration-200"
          />
        </div>

        <Transition name="slide">
          <p v-if="errorMessage" class="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{{ errorMessage }}</p>
        </Transition>

        <button
          type="submit"
          class="w-full py-4 bg-[#1E8E6E] hover:bg-[#166a53] text-white font-bold rounded-xl shadow-lg shadow-[#1E8E6E]/30 transform active:scale-[0.98] transition-all duration-300"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>
