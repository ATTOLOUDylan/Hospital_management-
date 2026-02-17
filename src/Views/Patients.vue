<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

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
        status: "Stable",
        doctorId: null,
        roomId: null,
        createdAt: '2026-02-14'
      },
      {
        id: 2,
        firstName: "Anna",
        lastName: "Smith",
        gender: "Female",
        phone: "0012345678",
        bloodGroup: "A+",
        status: "Critique",
        doctorId: null,
        roomId: null,
        createdAt: '2026-02-15'
      },
       
    ];
    localStorage.setItem("patients", JSON.stringify(patients.value));
  }
});

function deletePatient(id) {
  patients.value = patients.value.filter((p) => p.id !== id);
  localStorage.setItem("patients", JSON.stringify(patients.value));
}

// Retourne la couleur du badge selon le status
function statusClass(status) {
  if (status.toLowerCase() === "stable") return "status-stable";
  if (status.toLowerCase() === "critique") return "status-critical";
  return "status-unknown";
}
</script>

<template>
  <div class="patients-container">
    <div class="header-list">
      <h1>Liste des patients</h1>
      <RouterLink :to="{ name: 'PatientsForm' }">
        <button class="btn-add">+ Nouveau Patient</button>
      </RouterLink>
    </div>

    <div
      v-for="(p, index) in patients"
      :key="p.id"
      class="patient-card"
    >
      <div class="patient-info">
        <div class="patient-name">
          <h3>{{ index + 1 }}. {{ p.firstName }} {{ p.lastName }}</h3>
          <span class="status-badge" :class="statusClass(p.status)">
            {{ p.status }}
          </span>
        </div>
      </div>

      <div class="card-actions">
        <RouterLink :to="`/patients/${p.id}`" class="btn-detail">Détails</RouterLink>
        <button class="btn-delete" @click="deletePatient(p.id)">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.patients-container {
  margin: 40px auto;
  width: 80%;
  font-family: 'Inter', sans-serif;
}

.header-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.btn-add {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: #1e8e6e;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-add:hover {
  background: #166f56;
}

.patient-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  border-left: 6px solid #1e8e6e;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.patient-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.1);
}

.patient-info {
  display: flex;
  flex-direction: column;
}

.patient-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.patient-name h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
}

.status-stable {
  background: #4fbfa8;
}

.status-critical {
  background: #e76f51;
}

.status-unknown {
  background: #6c757d;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.card-actions .btn-detail {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.85rem;
  background: #1e8e6e;
  color: white;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: 0.2s ease;
}

.card-actions .btn-detail:hover {
  background: #166f56;
}

.card-actions .btn-delete {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
  transition: 0.2s ease;
}

.card-actions .btn-delete:hover {
  background: #e5e7eb;
}

/* Responsive */
@media (max-width: 768px) {
  .patient-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .card-actions {
    margin-top: 10px;
    width: 100%;
    justify-content: flex-start;
  }

  .patients-container {
    width: 95%;
  }
}

</style>
