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
  { path: "/", name: "login", component: Login, meta: { requiresAuth: false, hideNav : true } },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: Appointments,
    meta: { requiresAuth: true },
  },
  {
    path: "/doctors",
    name: "Doctors",
    component: Doctors,
    meta: { requiresAuth: true },
  },
  {
    path: "/patients",
    name: "Patients",
    component: Patients,
    meta: { requiresAuth: true },
  },
  {
    path: "/patients/:id",
    name: "Patients-details",
    component: PatientsDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/patients-form/:id?",
    name: "PatientsForm",
    component: PatientsForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: Rooms,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,

  },
    {
    path: "/plainte",
    name: "Plainte",
    component: Plaintes,

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
 ]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = authService.isAuthenticated();

  // 1. Vérifie si la route demande une authentification
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      // Pas connecté -> Redirection Login
      next({ name: "login" });
    } else {
      // Vérification spécifique pour la page Users (Admin uniquement)
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}",
      );
      if (to.meta.role === "Admin" && currentUser.role !== "Admin") {
        alert("Accès refusé : Réservé aux administrateurs");
        next({ name: "Home" });
      } else {
        next(); // Tout est OK
      }
    }
  }
  // 2. Si l'utilisateur est déjà connecté et tente d'aller sur le Login
  else if (to.name === "login" && loggedIn) {
    next({ name: "Home" });
  }
  // 3. Route publique ou accès autorisé
  else {
    next();
  }
});

export default router;
