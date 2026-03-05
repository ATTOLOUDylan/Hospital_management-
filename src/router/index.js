import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Views/Login.vue'
import Appointments from '@/Views/Appointments.vue'
import Doctors from '@/Views/Doctors.vue'
import Home from '@/Views/Home.vue'
import Patients from '@/Views/Patients.vue'
import Rooms from '@/Views/Rooms.vue'
import Users from '@/Views/Users.vue'
import PatientsDetail from '@/Components/PatientsDetail.vue'
import PatientsForm from '@/Components/PatientsForm.vue'
import Plaintes from '@/Views/Plaintes.vue'
import { authService } from '@/Service/authServices'
import NotFound from '@/Views/NotFound.vue'
const routes = [
  { path: "/", name: "login", component: Login, meta: { requiresAuth: false, hideNav: true } },
  { path: "/home", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/appointments", name: "Appointments", component: Appointments, meta: { requiresAuth: true } },
  
  // Sécurisé : Seul l'Admin peut voir les médecins
  { 
    path: "/doctors", 
    name: "Doctors", 
    component: Doctors, 
    meta: { requiresAuth: true, role: 'Admin' } 
  },
  
  { path: "/patients", name: "Patients", component: Patients, meta: { requiresAuth: true } },
  { path: "/patients/:id", name: "Patients-details", component: PatientsDetail, meta: { requiresAuth: true } },
  { path: "/patients-form/:id?", name: "PatientsForm", component: PatientsForm, meta: { requiresAuth: true } },
  { path: "/rooms", name: "Rooms", component: Rooms, meta: { requiresAuth: true } },
  
  // Sécurisé : Seul l'Admin peut gérer les utilisateurs
  { 
    path: "/users", 
    name: "Users", 
    component: Users, 
    meta: { requiresAuth: true, role: 'Admin' } 
  },
  
  { path: "/plainte", name: "Plainte", component: Plaintes, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = authService.isAuthenticated();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // 1. Redirection si non connecté sur une page protégée
  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: "login" });
  }

  // 2. Redirection si connecté et tente d'aller sur Login
  if (to.name === "login" && loggedIn) {
    return next({ name: "Home" });
  }

  // 3. Vérification des rôles (Admin uniquement pour Doctors et Users)
  if (to.meta.role === "Admin" && currentUser.role !== "Admin") {
    console.warn("Accès refusé : Droits insuffisants");
    return next({ name: "Home" }); // Redirige vers l'accueil si pas Admin
  }

  // 4. Sinon, on laisse passer
  next();
});

export default router;
