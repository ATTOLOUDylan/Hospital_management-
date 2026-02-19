<script setup>
import { ref, onMounted, computed } from "vue";
import Modal from "@/Components/Modal.vue";
import AppointmentsList from "@/Components/AppointmentsList.vue";
import AppointmentForm from "@/Components/AppointmentForm.vue";

const appointments = ref([]);
const patients = ref([]);
const doctors = ref([]);
const showModal = ref(false);
const editingAppointment = ref(null);
const currentUser = ref(null);

onMounted(() => {
    appointments.value = JSON.parse(localStorage.getItem("appointments") || "[]");
    patients.value = JSON.parse(localStorage.getItem("patients") || "[]");
    doctors.value = JSON.parse(localStorage.getItem("doctors") || "[]");

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) currentUser.value = JSON.parse(storedUser);
});

// 🔹 Filtrer les rendez-vous selon le rôle
const filteredAppointments = computed(() => {
    if (!currentUser.value) return [];
  
       // Si médecin : seulement ses rendez-vous
    if (currentUser.value.role === "doctor") {
        return appointments.value.filter(a => 
            a.doctorName?.toLowerCase() === currentUser.value.Name.toLowerCase()
        );
    }

    // Admin & Receptionniste : tout voir
    return appointments.value;
});

// 🔹 Contrôle si l'utilisateur peut modifier
const canEdit = computed(() => {
    return currentUser.value && currentUser.value.role !== "doctor";
});

function openModal(appointment = null) {
    if (appointment) {
        editingAppointment.value = { ...appointment };
    } else {
        editingAppointment.value = {
            id: null,
            patientId: "",
            doctorId: "",
            doctorName: "",
            date: "",
            time: "",
            status: "programmé"
        };
    }
    showModal.value = true;
}

function closeModal() {
    editingAppointment.value = null;
    showModal.value = false;
}

function saveAppointment(appointment) {
    const selectedDoctor = doctors.value.find(d => d.id === Number(appointment.doctorId));
    appointment.doctorName = selectedDoctor ? selectedDoctor.name : null;

    const conflict = appointments.value.some(a =>
        a.doctorId === appointment.doctorId &&
        a.date === appointment.date &&
        a.time === appointment.time &&
        a.id !== appointment.id
    );
    if (conflict) {
        alert("Ce créneau est déjà réservé !");
        return;
    }

    if (appointment.id) {
        const index = appointments.value.findIndex(a => a.id === appointment.id);
        if (index !== -1) appointments.value[index] = { ...appointment };
    } else {
        appointment.id = Date.now();
        appointments.value.push({ ...appointment });
    }

    localStorage.setItem("appointments", JSON.stringify(appointments.value));
    closeModal();
}

function deleteAppointment(id) {
    if (!confirm("Voulez-vous supprimer ce rendez-vous ?")) return;
    appointments.value = appointments.value.filter(a => a.id !== id);
    localStorage.setItem("appointments", JSON.stringify(appointments.value));
}

// ... tes autres refs existantes
const showDeleteModal = ref(false);
const idToDelete = ref(null);

// Déclenche l'ouverture du modal de confirmation
function confirmDelete(id) {
    idToDelete.value = id;
    showDeleteModal.value = true;
}

// Ferme le modal sans rien faire
function closeDeleteModal() {
    showDeleteModal.value = false;
    idToDelete.value = null;
}

// Exécute la suppression réelle
function executeDelete() {
    if (idToDelete.value) {
        appointments.value = appointments.value.filter(a => a.id !== idToDelete.value);
        localStorage.setItem("appointments", JSON.stringify(appointments.value));
    }
    closeDeleteModal();
}
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-10 py-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
    <div class="max-w-[1600px] mx-auto">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Gestion des Rendez-vous</h1>
          <p class="text-slate-500 font-medium mt-1">Planifiez et suivez les consultations médicales.</p>
        </div>
        <button v-if="canEdit" @click="openModal()" class="flex items-center gap-2 bg-[#1E8E6E] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#1E8E6E]/20 hover:bg-[#166f56] transition-all transform hover:-translate-y-1 active:scale-95">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
          Nouveau Rendez-vous
        </button>
      </div>

      <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <AppointmentsList 
          :appointments="filteredAppointments" 
          :patients="patients" :doctors="doctors" :can-edit="canEdit"
          @edit="openModal"
          @delete="confirmDelete" 
        />
      </div>

      <transition name="fade">
        <Modal v-if="showModal" @close="closeModal">
          <div class="p-2">
            <h3 class="text-xl font-black text-slate-800 mb-6 uppercase italic">
              {{ editingAppointment?.id ? 'Modifier le RDV' : 'Créer un RDV' }}
            </h3>
            <AppointmentForm :appointment="editingAppointment" :patients="patients" :doctors="doctors" @save="saveAppointment" />
          </div>
        </Modal>
      </transition>

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
              Êtes-vous sûr de vouloir supprimer ce rendez-vous ? <br>
              <span class="text-rose-500 font-bold">Cette action est définitive.</span>
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
/* Transition simple pour le modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>