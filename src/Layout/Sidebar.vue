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

</script>

<template>

  <div class="side" v-if="!$route.meta.hideNav && user">
    <h1>Dashboard</h1>
        <RouterLink  class="menu" :to="{name:'Home' }">Home</RouterLink>
        <RouterLink v-if="user.role=='Admin'" class="menu" :to="{name:'Doctors'}">Gestion des médecins </RouterLink>
        <RouterLink v-if="user.role=='Admin'|| user.role=='Receptionniste'" class="menu" :to="{name:'Patients'}">Gestion des patients</RouterLink>
        <RouterLink v-if="user.role=='Admin'|| user.role=='Receptionniste'" class="menu" :to="{name:'Appointments'}">Gestion des rendez-vous</RouterLink>
        <RouterLink v-if="user.role=='Admin'|| user.role=='Receptionniste'" class="menu" :to="{name:'Rooms'}">Gestion des chambres</RouterLink>
        <RouterLink v-if="user.role=='Admin'" class="menu" :to="{name:'Users'}">Gestion des utilisateurs</RouterLink>
  </div>
</template>

<style scoped>
/* ================================
   VARIABLES GLOBALES
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
   SIDEBAR
================================ */
.side {
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 100vh;
  padding: 24px 16px;
  gap: 12px;

  background-color: var(--white);
  border-right: 1px solid var(--gray-border);
}

/* Titre */
.side h1 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--green-primary);
  margin-bottom: 20px;
}

/* ================================
   MENU
================================ */
.menu {
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;

  font-size: 0.95rem;
  font-weight: 500;
  color: var(--gray-text);

  background-color: transparent;
  transition: all 0.25s ease;
}

/* Hover */
.menu:hover {
  background-color: var(--green-light);
}

/* Lien actif */
.router-link-active {
  background: linear-gradient(
    135deg,
    var(--green-primary)
  );
  color: var(--white);
  font-weight: 600;
}

/* ================================
   RESPONSIVE
================================ */
@media (max-width: 900px) {
  .side {
    width: 100%;
    min-height: auto;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
  }

  .side h1 {
    display: none;
  }

  .menu {
    white-space: nowrap;
  }
}

</style>