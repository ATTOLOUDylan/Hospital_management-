<script setup>
import AdminDashboard from './AdminDashboard.vue'
import ReceptionHome from './ReceptionHome.vue'
import DoctorDashboard from './DoctorDashboard.vue'
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})
</script>

<template>
  <div class="width">
    <AdminDashboard v-if="user && user.role === 'Admin'" />
    <ReceptionHome v-else-if="user && user.role === 'Receptionniste'" />
    <DoctorDashboard v-else-if="user && user.role === 'doctor'" />
  </div>
</template>


<style scoped>
.width {
  padding: 24px;
  width: 80%;
  background: #f8f9fa;
  margin-left: 50px;
  margin: auto;
}


</style>