<script setup>
import { ref, computed, onMounted } from "vue"

/* ===== USER CONNECTÉ ===== */
const currentUser = JSON.parse(localStorage.getItem("currentUser"))

/* ===== DATA ===== */
const patients = ref([])
const appointments = ref([])

onMounted(() => {
  patients.value = JSON.parse(localStorage.getItem("patients")) || []
  appointments.value = JSON.parse(localStorage.getItem("appointments")) || []
})

/* ===== COMPUTED ===== */
const myPatients = computed(() =>
  patients.value.filter(p => p.doctorName === currentUser.Name)
)

const hospitalizedPatients = computed(() =>
  myPatients.value.filter(p => p.status === "hospitalisé")
)

const today = new Date().toISOString().split("T")[0]
const todayAppointments = computed(() =>
  appointments.value
    .filter(a => a.doctorName === currentUser.Name && a.date === today)
    .map(a => ({
      ...a,
      patientName:
        patients.value.find(p => p.id === a.patientId)?.firstName + " " +
        patients.value.find(p => p.id === a.patientId)?.lastName || "Inconnu"
    }))
)

const myAppointments = computed(() =>
  appointments.value
    .filter(a => a.doctorName === currentUser.Name)
    .map(a => ({
      ...a,
      patientName:
        patients.value.find(p => p.id === a.patientId)?.firstName + " " +
        patients.value.find(p => p.id === a.patientId)?.lastName || "Inconnu"
    }))
)
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <!-- STATS -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-[#1E8E6E] text-white rounded-xl p-5 shadow-md flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold">{{ myPatients.length }}</h2>
          <p class="mt-1 text-sm">Mes patients</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.654 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <div class="bg-orange-400 text-white rounded-xl p-5 shadow-md flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold">{{ hospitalizedPatients.length }}</h2>
          <p class="mt-1 text-sm">Patients hospitalisés</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3M6 6h.01M6 18h.01M18 6h.01M18 18h.01" />
        </svg>
      </div>
    </div>

    <!-- MES PATIENTS -->
    <div class="bg-white rounded-xl p-5 mb-6 shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-800">Mes patients</h3>
        <button class="p-1 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0z"/>
          </svg>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#1E8E6E]">
            <tr>
              <th class="py-3 px-4 text-sm font-medium text-white">Nom</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Statut</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Chambre</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in myPatients" :key="p.id" class="border-b hover:bg-gray-50 transition">
              <td class="py-2 px-4 font-medium text-gray-800">{{ p.firstName }} {{ p.lastName }}</td>
              <td class="py-2 px-4">
                <span
                  :class="{
                    'bg-green-100 text-green-700': p.status === 'Actif',
                    'bg-yellow-100 text-yellow-700': p.status === 'Hospitalisé',
                    'bg-[#1E8E6E] text-white': p.status !== 'Actif' && p.status !== 'Hospitalisé'
                  }"
                  class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10"/>
                  </svg>
                  {{ p.status }}
                </span>
              </td>
              <td class="py-2 px-4 text-gray-700">{{ p.roomName || "—" }}</td>
              <td class="py-2 px-4">
                <button class="text-white bg-[#1E8E6E] hover:bg-[#166f57] px-3 py-1 rounded text-sm font-medium transition flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Voir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- RDV AUJOURD'HUI -->
    <div class="bg-white rounded-xl p-5 mb-6 shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-800">Mes rendez-vous aujourd’hui</h3>
        <button class="p-1 hover:bg-[#1E8E6E] rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0z"/>
          </svg>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#1E8E6E]">
            <tr>
              <th class="py-3 px-4 text-sm font-medium text-white">Patient</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Heure</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Doctor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rdv in todayAppointments" :key="rdv.id" class="border-b hover:bg-gray-50 transition">
              <td class="py-2 px-4 font-medium text-gray-800">{{ rdv.patientName }}</td>
              <td class="py-2 px-4 text-gray-700">{{ rdv.time }}</td>
              <td class="py-2 px-4 text-gray-700">{{ rdv.doctorName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TOUS LES RDV -->
    <div class="bg-white rounded-xl p-5 mb-6 shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-800">Mes rendez-vous</h3>
        <button class="p-1 hover:bg-[#1E8E6E] rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0z"/>
          </svg>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#1E8E6E]">
            <tr>
              <th class="py-3 px-4 text-sm font-medium text-white">Patient</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Date</th>
              <th class="py-3 px-4 text-sm font-medium text-white">Heure</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rdv in myAppointments" :key="rdv.id" class="border-b hover:bg-gray-50 transition">
              <td class="py-2 px-4 font-medium text-gray-800">{{ rdv.patientName }}</td>
              <td class="py-2 px-4 text-gray-700">{{ rdv.date }}</td>
              <td class="py-2 px-4 text-gray-700">{{ rdv.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>



