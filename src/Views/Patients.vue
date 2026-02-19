<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import Modal from "@/Components/Modal.vue"; // Assure-toi que le chemin est correct

const user = ref(null);
const patients = ref([]);
const searchQuery = ref("");
const statusFilter = ref("");

// ÉTATS POUR LE MODAL DE SUPPRESSION
const showDeleteModal = ref(false);
const patientToDelete = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) user.value = JSON.parse(storedUser);

  const savedPatients = localStorage.getItem("patients");
  if (savedPatients) {
    patients.value = JSON.parse(savedPatients);
  } else {
    patients.value = [
      { id: 1, firstName: "Ted", lastName: "Frost", gender: "Male", phone: "0025456347", bloodGroup: "O+", status: "Stable", doctorName: "DDD", createdAt: '2026-02-14' },
      { id: 2, firstName: "Anna", lastName: "Smith", gender: "Female", phone: "0012345678", bloodGroup: "A+", status: "Critique", doctorName: "DDD", createdAt: '2026-02-15' },
    ];
    localStorage.setItem("patients", JSON.stringify(patients.value));
  }
});

const filteredPatients = computed(() => {
  if (!user.value) return [];
  let result = patients.value;
  if (user.value.role === "doctor") {
    result = result.filter(p => p.doctorName === user.value.Name);
  }
  if (searchQuery.value.trim() !== "") {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.firstName.toLowerCase().includes(query) || 
      p.lastName.toLowerCase().includes(query)
    );
  }
  if (statusFilter.value !== "") {
    result = result.filter(p => p.status.toLowerCase() === statusFilter.value.toLowerCase());
  }
  return result;
});

// LOGIQUE DE SUPPRESSION STYLISÉE
function confirmDelete(patient) {
    patientToDelete.value = patient;
    showDeleteModal.value = true;
}

function closeDeleteModal() {
    showDeleteModal.value = false;
    patientToDelete.value = null;
}

function executeDelete() {
    if (patientToDelete.value) {
        // Filtrage de la liste des patients
        patients.value = patients.value.filter(p => p.id !== patientToDelete.value.id);
        localStorage.setItem("patients", JSON.stringify(patients.value));
    }
    closeDeleteModal();
}
</script>

<template>
  <div v-if="user" class="w-full px-4 sm:px-8 lg:px-10 py-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
    
    <div class="max-w-[1600px] mx-auto">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-black text-slate-800 tracking-tight italic uppercase">
            {{ user.role === 'doctor' ? 'Mes Patients' : 'Annuaire Patients' }}
          </h1>
          <p class="text-slate-500 font-medium mt-1">Gérez et suivez les dossiers médicaux actifs.</p>
        </div>
        
        <RouterLink :to="{ name: 'PatientsForm' }">
          <button class="flex items-center gap-2 bg-[#1E8E6E] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#1E8E6E]/20 hover:bg-[#166f56] transition-all transform hover:-translate-y-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
            Nouveau Patient
          </button>
        </RouterLink>
      </div>

      <div class="flex flex-col lg:flex-row gap-4 mb-8">
        <div class="relative flex-1 group">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1E8E6E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Rechercher par nom ou prénom..." 
            class="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#1E8E6E] focus:ring-4 focus:ring-[#1E8E6E]/5 transition-all font-medium text-slate-700 shadow-sm"
          />
        </div>

        <select 
          v-model="statusFilter" 
          class="px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#1E8E6E] font-bold text-slate-600 cursor-pointer shadow-sm appearance-none"
        >
          <option value="">Tous les statuts</option>
          <option value="stable">Statut : Stable</option>
          <option value="critique">Statut : Critique</option>
          <option value="hospialisé">Statut : Hospitalisé</option>
        </select>
      </div>

      <div v-if="filteredPatients.length > 0" class="grid grid-cols-1 gap-4">
        <div
          v-for="(p, index) in filteredPatients"
          :key="p.id"
          class="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#1E8E6E]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div class="flex items-center gap-6">
            <div class="hidden sm:flex w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center text-slate-400 font-black text-xl border border-slate-100 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E] transition-colors">
              {{ p.lastName.charAt(0) }}{{ p.firstName.charAt(0) }}
            </div>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="text-xl font-black text-slate-800 tracking-tight group-hover:text-[#1E8E6E] transition-colors">
                  {{ p.lastName }} {{ p.firstName }}
                </h3>
                <span :class="[
                  'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
                  p.status.toLowerCase() === 'stable' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                ]">
                  {{ p.status }}
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                <p class="text-slate-400 font-medium flex items-center gap-1">
                  <span class="font-bold text-slate-500">ID:</span> #{{ p.id }}
                </p>
                <p v-if="user.role !== 'doctor'" class="text-slate-400 font-medium flex items-center gap-1">
                  <span class="font-bold text-slate-500 uppercase text-[10px]">Médecin:</span> Dr. {{ p.doctorName }}
                </p>
                <p class="text-slate-400 font-medium italic">Inscrit le {{ p.createdAt }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <RouterLink :to="`/patients/${p.id}`" class="flex-1 md:flex-none">
              <button class="w-full md:w-auto px-6 py-3 bg-[#1E8E6E]/10 text-[#1E8E6E] rounded-xl font-black text-sm hover:bg-[#1E8E6E] hover:text-white transition-all">
                Voir le dossier
              </button>
            </RouterLink>
            <button 
              @click="confirmDelete(p)" 
              class="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Supprimer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="mt-12 p-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📂</div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Aucun résultat</h2>
        <p class="text-slate-400 mt-2 font-medium">Nous n'avons trouvé aucun patient correspondant à vos filtres.</p>
        <button @click="searchQuery = ''; statusFilter = ''" class="mt-6 text-[#1E8E6E] font-bold hover:underline">Réinitialiser les filtres</button>
      </div>

      <transition name="fade">
        <Modal v-if="showDeleteModal" @close="closeDeleteModal">
          <div class="text-center p-4">
            <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic">Confirmation</h3>
            <p class="text-slate-500 font-medium mb-8 leading-relaxed">
              Voulez-vous vraiment supprimer le dossier de <br>
              <span class="text-slate-900 font-black underline">{{ patientToDelete?.firstName }} {{ patientToDelete?.lastName }}</span> ?
              <br><span class="text-rose-500 font-bold text-sm">Cette action est définitive.</span>
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="closeDeleteModal" class="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">
                Annuler
              </button>
              <button @click="executeDelete" class="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform active:scale-95">
                Oui, supprimer
              </button>
            </div>
          </div>
        </Modal>
      </transition>

    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>