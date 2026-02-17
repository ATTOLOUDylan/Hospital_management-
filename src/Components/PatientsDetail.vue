<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const patients = ref(null);

onMounted(() => {
  const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");

  patients.value = savedPatients.find((p) => p.id === Number(route.params.id));
});
</script>

<template>
  <div class="container shadow-card">
    <button @click="$router.back()" class="btn-back">← Retour</button>
    <h1>Fiche Patient</h1>

    <div v-if="patients" class="info-grid">
      <div class="info-item">
        <span>Nom & Prénom</span>
        <p>{{ patients.lastName }} {{ patients.firstName }}</p>
      </div>
      <div class="info-item">
        <span>Genre</span>
        <p>{{ patients.gender }}</p>
      </div>
      <div class="info-item">
        <span>Groupe Sanguin</span>
        <p class="blood-badge">{{ patients.bloodGroup }}</p>
      </div>
      <div class="info-item">
        <span>Statut</span>
        <p :class="patients.status">{{ patients.status }}</p>
      </div>
      <div class="info-item">
        <span>Téléphone</span>
        <p>{{ patients.phone }}</p>
      </div>

      <router-link :to="{ name: 'PatientsForm', params: { id: patients.id } }">
        <button class="btn-edit">Modifier les informations</button>
      </router-link>
    </div>
    <div v-else class="error">Patient introuvable ❌</div>
  </div>
</template>

<style scoped>
.info-grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}
.info-item span {
  font-size: 12px;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.info-item p {
  margin: 5px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
.blood-badge {
  color: #1e8e6e;
  font-weight: bold;
}
.btn-edit {
  width: 100%;
  background-color: #1e8e6e;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
}
.btn-back {
  background: none;
  border: 1px solid #1e8e6e;
  color: #1e8e6e;
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
}

/* Styles pour le statut */
.Critique {
  color: #d9534f;
  font-weight: bold;
}
.Stable\/Bon {
  color: #1e8e6e;
}
</style>


</script>


<template>



</template>


<style scoped>


</style>
