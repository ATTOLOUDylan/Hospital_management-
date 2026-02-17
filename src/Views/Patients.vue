<script setup>
import { ref, onMounted } from "vue";

const patients = ref([]);

onMounted(() => {
  const savedPatients = localStorage.getItem("patients");
  if (savedPatients) {
    patients.value = JSON.parse(savedPatients);
  } else {
    patients.value = [
      {
        id: 1,
        firstName: "Ted",
        lastName: "Frost",
        gender: "Male",
        phone: "0025456347",
        bloodGroup: "O+",
        status: "Stable/Bon",
      },
    ];
    localStorage.setItem("patients", JSON.stringify(patients.value));
  }
});

function deletePatient(id) {
  patients.value = patients.value.filter((p) => p.id !== id);
  localStorage.setItem("patients", JSON.stringify(patients.value));
}
</script>

<template>
  <div class="container">
    <div class="header-list">
      <h1>Liste des patients</h1>
      <router-link :to="{ name: 'PatientsForm' }">
        <button class="btn-add">+ Nouveau Patient</button>
      </router-link>
    </div>
    
    <ul class="patient-list">
      <li v-for="(p, index) in patients" :key="p.id">
        <span class="patient-name"><strong>{{ index + 1 }}.</strong> {{ p.firstName }} {{ p.lastName }}</span>
        <div class="actions">
          <RouterLink :to="`/patients/${p.id}`" class="link-detail">Détails</RouterLink>
          <button @click="deletePatient(p.id)" class="btn-delete">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header-list { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.patient-list { list-style: none; padding: 0; }
li { 
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px; margin-bottom: 10px;
  background: white; border-radius: 8px;
  border-left: 5px solid #1E8E6E;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.btn-add { background-color: #1E8E6E; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
.btn-delete { background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-left: 10px; cursor: pointer; }
.link-detail { color: #1E8E6E; text-decoration: none; font-weight: bold; }
</style>