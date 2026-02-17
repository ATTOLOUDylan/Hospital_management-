<script setup>
import { ref, onMounted, computed } from "vue"

/* ===== INIT ===== */
function initLocalStorage() {
  if (!localStorage.getItem("patients")) {
    localStorage.setItem("patients", JSON.stringify([]))
  }
  if (!localStorage.getItem("appointments")) {
    localStorage.setItem("appointments", JSON.stringify([]))
  }
  if (!localStorage.getItem("rooms")) {
    localStorage.setItem(
      "rooms",
      JSON.stringify([
        { id: 1, numero: "E-42", status: "Libre" },
        { id: 2, numero: "E-43", status: "Occupée" },
        { id: 3, numero: "E-46", status: "Occupée" },
        { id: 4, numero: "E-32", status: "Occupée" }
      ])
    )
  }
}

/* ===== STATE ===== */
const patients = ref([])
const doctors = ref([])
const appointments = ref([])
const rooms = ref([])

onMounted(() => {
  initLocalStorage()
  patients.value = JSON.parse(localStorage.getItem("patients"))
  doctors.value = JSON.parse(localStorage.getItem("doctors"))
  appointments.value = JSON.parse(localStorage.getItem("appointments"))
  rooms.value = JSON.parse(localStorage.getItem("rooms"))
})

/* ===== STATS ===== */
const patientsToday = computed(() => patients.value.length)

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split("T")[0]
  return appointments.value.filter(a => a.date === today)
})

const occupiedRooms = computed(() =>
  rooms.value.filter(r => r.status === "occupée")
)
const unoccupiedRooms = computed(() =>
  rooms.value.filter(r => r.status === "libre")
)

function getPatientName(id) {
  const p = patients.value.find(p => p.id === id);
  return p ? `${p.firstName} ${p.lastName}` : "Inconnu";
}

function getDoctorName(id) {
  const d = doctors.value.find(d => d.id === id);
  return d ? d.name : "Inconnu";
}
</script>

<template>
  <div class="home-container">

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <h3>{{ patientsToday }}</h3>
        <p>Patients enregistrés aujourd’hui</p>
      </div>

      <div class="stat-card orange">
        <h3>{{ todayAppointments.length }}</h3>
        <p>Rendez-vous aujourd’hui</p>
      </div>

      <div class="stat-card green">
        <h3>{{ unoccupiedRooms.length }}</h3>
        <p>Chambres disponibles</p>
      </div>

      <div class="stat-card red">
        <h3>{{ occupiedRooms.length }}</h3>
        <p>Chambres occupées</p>
      </div>
    </div>

    <!-- RDV -->
    <div class="card">
      <h2 class="RDV">Rendez-vous aujourd’hui</h2>

      <table v-if="todayAppointments.length">
        
          <tr>
            <th>Patient</th>
            <th>Docteur</th>
            <th>Heure</th>
            <th>Statut</th>
          </tr>
        
        
          <tr v-for="rdv in todayAppointments" :key="rdv.id">
            <td>{{ getPatientName(rdv.patientId) }}</td>
            <td>{{getDoctorName(rdv.doctorId)  }}</td>
            <td>{{ rdv.time }}</td>
            <td>
              <span class="badge" :class="rdv.status === 'Terminée' ? 'done' : 'soon'">
                {{ rdv.status }}
              </span>
            </td>
          </tr>
        
      </table>

      <p v-else>Aucun rendez-vous aujourd’hui</p>
    </div>

    <!-- GESTION RAPIDE -->
    <div class="card">
      <h2>Gestion rapide</h2>
      <div class="actions">
        <RouterLink :to="{ name: 'PatientsForm' }">
            <button class="btn green" >Ajouter Patient</button>
        </RouterLink>
        
        <RouterLink :to="{ name: 'Appointments' }">
            <button class="btn orange" >Planifier Rendez-vous</button>
        </RouterLink>
        
      </div>
    </div>

    <!-- CHAMBRES -->
    <div class="card">
      <h2>État des chambres</h2>
      <ul class="chambre-list">
        <li v-for="room in rooms" :key="room.id">
          <span>{{ room.numero }}</span>
          <span class="badge" :class="room.status === 'libre' ? 'free' : 'busy'">
            {{ room.status }}
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>


<style scoped>
.home-container {
  padding: 24px;
  background: #f8f9fa;
}

/* ===== STATS ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  padding: 20px;
  border-radius: 12px;
  color: white;
}

.stat-card h3 {
  font-size: 28px;
  margin: 0;
}

.blue { background: #6fb6e9; }
.orange { background: #f7a96b; }
.green { background: #7fd1ae; }
.red { background: #f28b82; }

/* ===== CARDS ===== */
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* ===== TABLE ===== */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}
td{
    text-align: center;
}
.RDV{
    text-align: center;
    color: #065f46;
}
/* ===== BADGES ===== */
.badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
}

.done { background: #d1fae5; color: #065f46; }
.soon { background: #e0f2fe; color: #075985; }
.free { background: #d1fae5; color: #065f46; }
.busy { background: #fee2e2; color: #991b1b; }

/* ===== ACTIONS ===== */
.actions {
  display: flex;
  gap: 15px;
}

.btn {
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.btn.green { background: #1e8e6e; }
.btn.orange { background: #f59e0b; }

/* ===== CHAMBRES ===== */
.chambre-list {
  list-style: none;
  padding: 0;
}

.chambre-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
</style>
