<script setup>
import { ref, onMounted, computed } from 'vue'

const patients = ref([])
const doctors = ref([])
const appointments = ref([])
const rooms = ref([])

onMounted(() => {
  patients.value = JSON.parse(localStorage.getItem('patients')) || []
  doctors.value = JSON.parse(localStorage.getItem('doctors')) || []
  appointments.value = JSON.parse(localStorage.getItem('appointments')) || []
  rooms.value = JSON.parse(localStorage.getItem('rooms')) || []
})

const totalPatients = computed(() => patients.value.length)

const hospitalizedPatients = computed(() =>
  patients.value.filter(p => p.status === 'hospitalisé').length
)

const totalDoctors = computed(() => doctors.value.length)

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return appointments.value.filter(a => a.date === today).length
})
const lastPatients = computed(() => {
  return [...patients.value]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})
const fullRooms = computed(() =>
  rooms.value.filter(r => r.status === 'occupée')
)

</script>



<template>
<div class="admin-dashboard">
    <h1 class="title">Dashboard Administrateur</h1>
        
    <div class="stats-grid">
    <div class="card green">
      <p class="number">{{ totalPatients }}</p>
      <p class="label">Patients</p>
    </div>

    <div class="card red">
      <p class="number">{{ hospitalizedPatients }}</p>
      <p class="label">Patients hospitalisés</p>
    </div>

    <div class="card blue">
      <p class="number">{{ totalDoctors }}</p>
      <p class="label">Médecins</p>
    </div>

    <div class="card orange">
      <p class="number">{{ todayAppointments }}</p>
      <p class="label">RDV aujourd’hui</p>
    </div>
  </div>

  <h2 class="section-title">Derniers patients ajoutés</h2>

  <div class="table-card">
    <table class="table">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Médecin</th>
          <th>Chambre</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in lastPatients" :key="p.id">
          <td>{{ p.firstName }} {{ p.lastName }}</td>
          <td>{{ doctors.find(d => d.id === p.doctorId)?.name || '—' }}</td>
          <td>{{ p.roomId || '—' }}</td>
          <td>{{ p.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="fullRooms.length" class="alert">
    ⚠️ {{ fullRooms.length }} chambre(s) occupée(s)
  </div>
</div>


</template>

<style scoped>
.admin-dashboard {
  padding: 24px 40px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* alignement à gauche */
  background-color: #f8f9fa;
  box-sizing: border-box;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #212529;
}

/* ===== STATS ===== */
.stats-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.12);
}

.card .number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.card .label {
  font-size: 14px;
  opacity: 0.9;
  letter-spacing: 0.5px;
}

/* couleurs */
.green { background: #4fbfa8; }
.red { background: #e76f51; }
.blue { background: #6ec1e4; }
.orange { background: #f4a261; }

/* ===== TABLE ===== */
.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #212529;
}

.table-card {
  background: #ffffff;
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 24px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table th {
  text-align: left;
  color: #495057;
  font-weight: 600;
  padding-bottom: 12px;
}

.table td {
  padding: 12px 0;
  border-top: 1px solid #e9ecef;
}

/* ===== ALERT ===== */
.alert {
  width: 100%;
  padding: 16px;
  background: #fff3cd;
  border-radius: 12px;
  color: #856404;
  font-size: 14px;
  margin-top: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

/* Mobile */
@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr; /* 1 colonne sur petit écran */
  }

  .admin-dashboard {
    padding: 20px;
  }

  .table-card {
    padding: 16px;
  }
}


</style>

