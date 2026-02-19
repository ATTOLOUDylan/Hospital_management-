<script setup>
import { ref, onMounted } from "vue";
import DoctorForm from "@/Components/DoctorForm.vue";
import DoctorCard from "@/Components/DoctorCard.vue";
import Modal from "@/Components/Modal.vue"; // Assure-toi que l'import est là
import { authService } from "@/Service/authServices";

const doctors = ref([]);
const showModal = ref(false); // Modal du formulaire
const showDeleteModal = ref(false); // Modal de confirmation
const editingDoctor = ref(null);
const doctorToDelete = ref(null);

onMounted(() => {
  const saved = localStorage.getItem("doctors");
  if (saved) {
    doctors.value = JSON.parse(saved);
  } else {
    // Liste initiale si vide
    doctors.value = [
       { id: 1, name: "Jean Dupont", speciality: "Cardiologue", phone: "0102030405", available: true },
    ];
    saveToLocalStorage();
  }
});

function saveToLocalStorage() {
  localStorage.setItem("doctors", JSON.stringify(doctors.value));
}

// --- LOGIQUE DU FORMULAIRE (AJOUT/EDIT) ---
function openAddModal() {
  editingDoctor.value = null;
  showModal.value = true;
}

function openEditModal(doctor) {
  editingDoctor.value = doctor;
  showModal.value = true;
}

function saveDoctor(doctorData) {
  const formattedDoctor = {
    id: doctorData.id || Date.now(),
    name: doctorData.name || "",
    speciality: doctorData.speciality || "",
    phone: doctorData.phone || "",
    available: doctorData.available ?? true,
    password: doctorData.password || "",
  };

  if (editingDoctor.value) {
    const index = doctors.value.findIndex(d => d.id === formattedDoctor.id);
    doctors.value[index] = formattedDoctor;
  } else {
    doctors.value.push(formattedDoctor);
    authService.addDoctor({
      name: formattedDoctor.name,
      password: formattedDoctor.password,
    });
  }

  saveToLocalStorage();
  showModal.value = false;
}

// --- LOGIQUE DE SUPPRESSION AVEC CONFIRMATION ---
function confirmDelete(doctor) {
  doctorToDelete.value = doctor;
  showDeleteModal.value = true;
}

function executeDelete() {
  if (doctorToDelete.value) {
    doctors.value = doctors.value.filter((d) => d.id !== doctorToDelete.value.id);
    saveToLocalStorage();
  }
  closeDeleteModal();
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  doctorToDelete.value = null;
}
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-10 py-10 bg-[#f8fafc] min-h-screen font-sans">
    <div class="max-w-[1600px] mx-auto">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-black text-slate-800 tracking-tight italic uppercase">
            Gestion des Médecins
          </h1>
          <p class="text-slate-500 font-medium mt-1">Gérez votre équipe médicale et les accès comptes.</p>
        </div>
        
        <button @click="openAddModal" class="flex items-center gap-2 bg-[#1E8E6E] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#1E8E6E]/20 hover:bg-[#166f56] transition-all transform hover:-translate-y-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
          Nouveau Médecin
        </button>
      </div>

      <div v-if="doctors.length > 0" class="grid grid-cols-1 gap-2">
        <DoctorCard
          v-for="doctor in doctors"
          :key="doctor.id"
          :doctor="doctor"
          @edit="openEditModal"
          @delete="confirmDelete" 
        />
      </div>

      <div v-else class="mt-12 p-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">👨‍⚕️</div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Aucun médecin</h2>
        <p class="text-slate-400 mt-2 font-medium">Commencez par ajouter un membre à votre équipe.</p>
      </div>

      <DoctorForm
        v-if="showModal"
        :doctor="editingDoctor"
        @close="showModal = false"
        @save="saveDoctor"
      />

      <transition name="fade">
        <Modal v-if="showDeleteModal" @close="closeDeleteModal">
          <div class="text-center p-4">
            <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic">Confirmation</h3>
            <p class="text-slate-500 font-medium mb-8">
              Voulez-vous vraiment supprimer le <span class="text-slate-900 font-bold underline">Dr. {{ doctorToDelete?.name }}</span> ?
              <br><span class="text-rose-500 text-sm font-bold">Cette action supprimera également ses accès.</span>
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="closeDeleteModal" class="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">
                Annuler
              </button>
              <button @click="executeDelete" class="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform active:scale-95">
                Supprimer
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