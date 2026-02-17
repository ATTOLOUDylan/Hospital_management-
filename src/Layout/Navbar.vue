<script setup>
import { ref, onMounted , watch} from 'vue';
import { useRouter ,useRoute} from 'vue-router';
import { authService } from '@/Service/authServices';
const router = useRouter();
const route = useRoute();
const user = ref(null);



onMounted(() => {
  // Récupération de l'objet stocké au login
  
});
watch(
  () => route.path,
  (newValue, oldValue) => {
     const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    user.value = JSON.parse(storedUser); 
    console.log("user monté");
    
  }
  }
)
const isLoggedOut = () => {
  authService.logOut();
  user.value = null; // On nettoie l'état local
  router.push("/");
};
</script>

<template>
      <nav v-if="!$route.meta.hideNav">
      <div class="nav-brand">
        <div class="logo-container">
          <div class="logo-black-box">
           <svg fill="#E8F5F0" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,16c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3h-4v3c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1v3h4V8c0-0.6,0.4-1,1-1s1,0.4,1,1V16z"/></svg>
          </div>
          <h1>Harmony Health Center </h1>
        </div>
      </div>
      
      <div class="nav-user" v-if="user">
        <span class="greeting">Bonjour, {{ user.Name }}</span>
        <button @click="isLoggedOut" class="logout">logout</button>
      </div>
    </nav>
</template>

<style scoped>
/* ================================
   VARIABLES COULEURS
================================ */
:global(:root) {
  --green-primary: #1E8E6E;
  --green-light: #E8F5F0;
  --blue-medical: #1C6ED5;
  --white: #ffffff;
  --gray-text: #5F6F73;
  --gray-border: #e4eaea;
}

/* ================================
   NAVIGATION
================================ */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5rem;
  height: 70px;
  background: var(--white);
  border-bottom: 1px solid var(--gray-border);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* ================================
   BRAND / LOGO
================================ */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Icône médicale */
.logo-black-box {
  width: 38px;
  height: 38px;
  background: linear-gradient(
    135deg,
    var(--green-primary),
    var(--blue-medical)
  );
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-svg {
  width: 20px;
  height: 20px;
  fill: var(--white);
}

/* Nom du site */
nav h1 {
  font-size: 1.2rem;
  margin: 0;
  font-weight: 700;
  color: var(--green-primary);
  letter-spacing: -0.02em;
}

/* ================================
   LIENS NAVIGATION
================================ */
nav a {
  color: var(--gray-text);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  transition: color 0.25s ease;
}

nav a::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--green-primary);
  transition: width 0.3s ease;
}

nav a:hover {
  color: var(--green-primary);
}

nav a:hover::after {
  width: 100%;
}

/* ================================
   UTILISATEUR
================================ */
.nav-user {
  display: flex;
  align-items: center;
  gap: 22px;
}

.greeting {
  font-size: 0.9rem;
  color: var(--gray-text);
  font-weight: 500;
}

/* ================================
   BOUTON LOGOUT
================================ */
.logout {
  background-color: var(--green-light);
  color: var(--green-primary);
  border: 1px solid transparent;
  padding: 7px 18px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.logout:hover {
  background-color: var(--green-primary);
  color: var(--white);
  box-shadow: 0 6px 16px rgba(30, 142, 110, 0.25);
}

/* ================================
   MAIN
================================ */
main {
  width: 100%;
  background-color: #f9fdfb;
  min-height: calc(100vh - 70px);
  padding: 2rem;
}

</style>