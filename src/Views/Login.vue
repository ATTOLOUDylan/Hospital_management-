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
  <div class="studio-wrapper">
    <div class="auth-card">
      <header class="auth-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h1>Bon retour</h1>
        <p>Connectez-vous à votre espace Calendlys.</p>
      </header>

      <form @submit.prevent="login" class="auth-form">
        <div class="field-group">
          <label for="name">Name</label>
          <input 
            v-model="Name" 
            type="text" 
            id="name" 
            placeholder="Your name" 
            required 
          />
        </div>

        <div class="field-group">
          <div class="label-row">
            <label for="password">Mot de passe</label>
          </div>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <Transition name="slide">
          <p v-if="errorMessage" class="error-banner">{{ errorMessage }}</p>
        </Transition>

        <button type="submit" class="submit-btn">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* --- BASE & FONTS --- */
.studio-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* --- CARD --- */
.auth-card {
  width: 100%;
  max-width: 400px; /* Légèrement plus étroit que le register */
  background: #ffffff;
  padding: 48px;
  border-radius: 12px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.03);
}

/* --- HEADER --- */
.auth-header {
  text-align: center;
  margin-bottom: 32px;
}
.logo {
  width: 40px;
  height: 40px;
  background: #000000;
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.logo svg { width: 22px; height: 22px; }
h1 { font-size: 24px; font-weight: 600; color: #111111; margin: 0; letter-spacing: -0.02em; }
.auth-header p { font-size: 14px; color: #666666; margin-top: 8px; }

/* --- FORM --- */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
label {
  font-size: 13px;
  font-weight: 500;
  color: #444444;
}
.forgot-link {
  font-size: 12px;
  color: #666666;
  text-decoration: none;
}
.forgot-link:hover { color: #000000; }

input {
  height: 42px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-size: 14px;
  color: #111111;
  transition: all 0.2s ease;
}
input::placeholder { color: #aaaaaa; }
input:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

/* --- BUTTON --- */
.submit-btn {
  height: 44px;
  background: #111111;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 8px;
}
.submit-btn:hover { opacity: 0.9; }

/* --- FEEDBACK --- */
.error-banner {
  font-size: 13px;
  color: #e53e3e;
  background: #fff5f5;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #feb2b2;
  text-align: center;
}

/* --- FOOTER --- */
.auth-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #666666;
}
.auth-footer a {
  color: #111111;
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
}
.auth-footer a:hover { text-decoration: underline; }

/* Animations */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 480px) {
  .auth-card { padding: 32px 20px; border: none; box-shadow: none; background: transparent; }
}
</style>