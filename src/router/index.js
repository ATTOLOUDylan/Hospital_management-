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

 const routes =[
    {
    path: "/home",
    name: "Home",
    component: Home,

  },
    {
    path: "/",
    name: "login",
    component: Login,
    meta: { hideNav: true },
  },
    {
    path: "/appointments",
    name: "Appointments",
    component: Appointments,

  },
    {
    path: "/doctors",
    name: "Doctors",
    component: Doctors,

  },
    {
    path: "/patients",
    name: "Patients",
    component: Patients,

  },
    {
    path: "/patients/:id",
    name: "Patients-details",
    component: PatientsDetail,

  },
    {
    path: "/patients-form/:id?",
    name: "PatientsForm",
    component: PatientsForm,

  },
    {
    path: "/rooms",
    name: "Rooms",
    component: Rooms,
 
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
 ]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
