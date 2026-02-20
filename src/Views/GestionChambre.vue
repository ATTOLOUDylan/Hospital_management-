<script setup>
import { ref, onMounted, computed } from 'vue'

// --- ÉTATS RÉACTIFS ---
const chambres = ref([])
const patients = ref([])
const showModal = ref(false)
const editingRoomId = ref(null)
const filterRoom = ref('')
const showDeleteModal = ref(false)
const roomToDelete = ref(null)

// Modèle de données pour le formulaire
const form = ref({
  numero: '',
  type: 'Standard',
  capacite: 1,
  status: 'libre',
  AffectationPatient: 0
})

// --- FONCTION POUR OBTENIR LES PATIENTS D'UNE CHAMBRE ---
const getPatientsByRoom = (roomNumero) => {
  return patients.value.filter(p => p.roomName === roomNumero)
}

// --- COMPUTED: Chambres avec leurs patients ---
const chambresWithPatients = computed(() => {
  let filteredChambres = chambres.value
  
  // Appliquer le filtre de chambre
  if (filterRoom.value) {
    filteredChambres = filteredChambres.filter(c => c.numero === filterRoom.value)
  }
  
  return filteredChambres.map(chambre => {
    const roomPatients = getPatientsByRoom(chambre.numero)
    const isOccupied = roomPatients.length > 0
    return {
      ...chambre,
      patients: roomPatients,
      status: isOccupied ? 'occupée' : 'libre',
      patientCount: roomPatients.length
    }
  })
})

// --- COMPUTED: Liste des chambres pour le filtre ---
const roomOptions = computed(() => {
  return chambres.value.map(c => c.numero)
})

// --- INITIALISATION ET STOCKAGE ---
onMounted(() => {
  // Charger les patients depuis localStorage
  const savedPatients = JSON.parse(localStorage.getItem('patients') || '[]')
  patients.value = savedPatients

  // Charger les chambres depuis localStorage 'rooms'
  const savedRooms = JSON.parse(localStorage.getItem('rooms') || '[]')
  if (savedRooms.length === 0) {
    const initialData = [
      { id: 1, numero: "A-01", status: 'libre', type: "Standard", capacite: 10, AffectationPatient: 0 },
      { id: 2, numero: "A-02", status: 'libre', type: "VIP", capacite: 5, AffectationPatient: 0 }
    ]
    chambres.value = initialData
    saveToStorage()
  } else {
    chambres.value = savedRooms
  }
})

const saveToStorage = () => {
  localStorage.setItem('rooms', JSON.stringify(chambres.value))
}

// --- LOGIQUE CRUD (Chambres) ---

const openModal = (room = null) => {
  if (room) {
    editingRoomId.value = room.id
    form.value = { ...JSON.parse(JSON.stringify(room)) }
  } else {
    editingRoomId.value = null
    form.value = { numero: '', type: 'Standard', capacite: 1, status: 'libre', AffectationPatient: 0 }
  }
  showModal.value = true
}

const saveRoom = () => {
  if (!form.value.numero) return alert("Le numéro est requis")

  if (editingRoomId.value) {
    const index = chambres.value.findIndex(r => r.id === editingRoomId.value)
    chambres.value[index] = { ...form.value }
  } else {
    const newRoom = { ...form.value, id: Date.now() }
    chambres.value.push(newRoom)
  }
  
  saveToStorage()
  showModal.value = false
}

const deleteRoom = (id) => {
  chambres.value = chambres.value.filter(r => r.id !== id)
  saveToStorage()
  showDeleteModal.value = false
  roomToDelete.value = null
}

const openDeleteModal = (room) => {
  roomToDelete.value = room
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  roomToDelete.value = null
}

// --- UI HELPERS ---
const getTypeClass = (type) => {
  switch (type) {
    case 'VIP': return 'bg-purple-100 text-purple-700'
    case 'Soins Intensifs': return 'bg-red-100 text-red-700'
    case 'Pédiatrie': return 'bg-pink-100 text-pink-700'
    default: return 'bg-blue-100 text-blue-700'
  }
}

const getPatientName = (patient) => {
  return `${patient.lastName} ${patient.firstName}`
}
</script>

<template>
  <div class="w-full p-6 bg-gray-100 min-h-screen">
    
    <!-- Header -->
    <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Chambres</h1>
        <p class="text-gray-500 text-sm">Administration des unites et suivi des patients</p>
      </div>
      
      <button 
        @click="openModal()"
        class="bg-[#1E8E6E] text-white px-4 py-2 rounded font-medium hover:bg-[#167a5d]"
      >
        + Nouvelle Chambre
      </button>
    </div>

    <!-- Filtre -->
    <div class="mb-6 flex items-center gap-3">
      <label class="text-sm font-medium text-gray-600">Filtrer:</label>
      <select v-model="filterRoom" class="px-3 py-2 bg-white border border-gray-300 rounded text-sm">
        <option value="">Toutes les chambres</option>
        <option v-for="room in roomOptions" :key="room" :value="room">{{ room }}</option>
      </select>
      <button v-if="filterRoom" @click="filterRoom = ''" class="text-sm text-gray-500 hover:text-gray-700">
        Reset
      </button>
    </div>

    <!-- Liste des chambres -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div 
        v-for="chambre in chambresWithPatients" 
        :key="chambre.id" 
        class="bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow p-4"
      >
        <!-- En-tete avec numero et type -->
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-lg font-bold text-gray-800">Chambre {{ chambre.numero }}</h3>
            <span :class="['px-2 py-0.5 rounded text-xs font-medium mt-1 inline-block', getTypeClass(chambre.type)]">
              {{ chambre.type }}
            </span>
          </div>
          <span :class="['px-2 py-1 rounded text-xs font-medium', chambre.status === 'libre' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
            {{ chambre.status }}
          </span>
        </div>

        <!-- Patients -->
        <div class="border-t border-gray-200 pt-3 mb-3">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-semibold text-gray-500">PATIENTS</span>
            <span class="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
              {{ chambre.patientCount || 0 }} / {{ chambre.capacite }}
            </span>
          </div>
          
          <ul class="space-y-1">
            <li v-for="patient in chambre.patients" :key="patient.id" class="flex justify-between items-center bg-gray-50 px-2 py-1.5 rounded text-sm">
              <span class="font-medium text-gray-700">{{ getPatientName(patient) }}</span>
              <span :class="['text-xs px-1.5 py-0.5 rounded font-medium', patient.status === 'critique' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600']">
                {{ patient.status }}
              </span>
            </li>
            <li v-if="!chambre.patients || chambre.patients.length === 0" class="text-xs text-gray-400 italic py-2">
              Aucun patient dans cette chambre
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-2 border-t border-gray-100">
          <button @click="openModal(chambre)" class="flex-1 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
            Modifier
          </button>
          <button @click="openDeleteModal(chambre)" class="flex-1 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Edition -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ editingRoomId ? 'Modifier la chambre' : 'Nouvelle Chambre' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Numero</label>
            <input v-model="form.numero" type="text" placeholder="ex: A-10" class="w-full px-3 py-2 border border-gray-300 rounded">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Capacite</label>
            <input v-model.number="form.capacite" type="number" class="w-full px-3 py-2 border border-gray-300 rounded">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Type</label>
            <select v-model="form.type" class="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Standard</option>
              <option>VIP</option>
              <option>Soins Intensifs</option>
              <option>Pediatrie</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="showModal = false" class="flex-1 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">Annuler</button>
          <button @click="saveRoom" class="flex-1 py-2 bg-[#1E8E6E] text-white rounded hover:bg-[#167a5d]">Confirmer</button>
        </div>
      </div>
    </div>

    <!-- Modal Suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-sm">
        <div class="text-center">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Confirmation</h3>
          <p class="text-sm text-gray-500 mb-6">
            Voulez-vous vraiment supprimer la chambre <strong>{{ roomToDelete?.numero }}</strong> ?
          </p>
          <div class="flex gap-3">
            <button @click="closeDeleteModal" class="flex-1 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">Annuler</button>
            <button @click="deleteRoom(roomToDelete?.id)" class="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
