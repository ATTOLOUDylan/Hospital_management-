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
        <div class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path
              d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z" />
          </svg>
          <p class="number">{{ totalPatients }}</p>
        </div>
        <h2 class="label">Patients</h2>
      </div>

      <div class="card red">
        <div class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path
              d="M64 96C81.7 96 96 110.3 96 128L96 352L320 352L320 224C320 206.3 334.3 192 352 192L512 192C565 192 608 235 608 288L608 512C608 529.7 593.7 544 576 544C558.3 544 544 529.7 544 512L544 448L96 448L96 512C96 529.7 81.7 544 64 544C46.3 544 32 529.7 32 512L32 128C32 110.3 46.3 96 64 96zM144 256C144 220.7 172.7 192 208 192C243.3 192 272 220.7 272 256C272 291.3 243.3 320 208 320C172.7 320 144 291.3 144 256z" />
          </svg>
          <p class="number">{{ hospitalizedPatients }}</p>
        </div>
        <h2 class="label">Patients hospitalisés</h2>
      </div>

      <div class="card blue">
        <div class="flex">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
            </svg>
          </p>
          <p class="number">{{ totalDoctors }}</p>
        </div>
        <h2 class="label">Médecins</h2>
      </div>

      <div class="card orange">
        <div class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path
              d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L369 320C402.8 290.1 447.3 272 496 272C524.6 272 551.6 278.2 576 289.4L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L321.4 544C310.2 519.6 304 492.6 304 464C304 447.4 306.1 431.3 310 416L288 416zM640 464C640 384.5 575.5 320 496 320C416.5 320 352 384.5 352 464C352 543.5 416.5 608 496 608C575.5 608 640 543.5 640 464zM496 384C504.8 384 512 391.2 512 400L512 448L544 448C552.8 448 560 455.2 560 464C560 472.8 552.8 480 544 480L496 480C487.2 480 480 472.8 480 464L480 400C480 391.2 487.2 384 496 384z" />
          </svg>
          <p class="number">{{ todayAppointments }}</p>
        </div>
        <h2 class="label">RDV aujourd’hui</h2>
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
            <td>{{doctors.find(d => d.id === p.doctorId)?.name || '—'}}</td>
            <td>{{ p.roomName || '—' }}</td>
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
* {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.admin-dashboard {
  padding: 24px 40px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* alignement à gauche */
  background-color: #f8f9fa;
  box-sizing: border-box;
}

svg {
  width: 80px;
  fill: white;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #212529;
}

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

/* ===== STATS ===== */
.stats-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  border-radius: 16px;
  height: 250px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.card .number {
  font-size: 80px;
  font-weight: bold;

}

.card .label {
  font-size: 25px;
  opacity: 0.9;
  letter-spacing: 0.5px;
}

/* couleurs */
.green {
  background: #4fbfa9c5;
}

.red {
  background: #e76f51bb;
}

.blue {
  background: #6ec1e4b6;
}

.orange {
  background: #f4a361b9;
}

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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Mobile */
@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
    /* 1 colonne sur petit écran */
  }

  .admin-dashboard {
    padding: 20px;
  }

  .table-card {
    padding: 16px;
  }
}
</style>
