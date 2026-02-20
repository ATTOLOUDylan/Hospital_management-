<script setup>
import { ref, onMounted , computed } from "vue";
import DoctorForm from "@/Components/DoctorForm.vue";
import DoctorCard from "@/Components/DoctorCard.vue";
import Modal from "@/Components/Modal.vue"; 
import Notification from "@/Components/Notification.vue"; // Importation du nouveau composant
import { authService } from "@/Service/authServices";

const doctors = ref([]);
const showModal = ref(false); 
const showDeleteModal = ref(false); 
const editingDoctor = ref(null);
const doctorToDelete = ref(null);
const searchQuery = ref("");
const specialityFilter = ref("Toutes");

// État de la notification
const notification = ref({ message: '', type: 'success' });

function triggerNotify(msg, type = 'success') {
  notification.value.message = msg;
  notification.value.type = type;
  setTimeout(() => {
    notification.value.message = '';
  }, 3000);
}

const uniqueSpecialities = computed(() => {
  const specs = doctors.value.map(d => d.speciality);
  return ["Toutes", ...new Set(specs)];
});

const filteredDoctors = computed(() => {
  return doctors.value.filter((doctor) => {
    const name = doctor.name || "";
    const spec = doctor.speciality || "";
    const matchesName = name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesSpec = specialityFilter.value === "Toutes" || spec === specialityFilter.value;
    return matchesName && matchesSpec;
  });
});

onMounted(() => {
  const saved = localStorage.getItem("doctors");
  if (saved) {
    doctors.value = JSON.parse(saved);
  } else {
    doctors.value = [{ id: 1, name: "Jean Dupont", speciality: "Cardiologue", phone: "0102030405", available: true }];
    saveToLocalStorage();
  }
});

function saveToLocalStorage() {
  localStorage.setItem("doctors", JSON.stringify(doctors.value));
}

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
    triggerNotify("Informations mises à jour !"); // NOTIF MODIF
  } else {
    doctors.value.push(formattedDoctor);
    authService.addDoctor({ name: formattedDoctor.name, password: formattedDoctor.password });
    triggerNotify("Nouveau médecin enregistré !"); // NOTIF AJOUT
  }

  saveToLocalStorage();
  showModal.value = false;
}

function confirmDelete(doctor) {
  doctorToDelete.value = doctor;
  showDeleteModal.value = true;
}

function executeDelete() {
  if (doctorToDelete.value) {
    doctors.value = doctors.value.filter((d) => d.id !== doctorToDelete.value.id);
    saveToLocalStorage();
    triggerNotify("Médecin retiré du système", "error"); // NOTIF SUPPR
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
    
    <Notification :message="notification.message" :type="notification.type" />

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

      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="flex-1 relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input v-model="searchQuery" type="text" placeholder="Rechercher un médecin..." class="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#1E8E6E]/20 outline-none transition-all font-medium text-slate-700" />
        </div>

        <div class="w-full md:w-64 relative">
          <select v-model="specialityFilter" class="w-full appearance-none px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#1E8E6E]/20 outline-none cursor-pointer font-bold text-slate-700">
            <option v-for="spec in uniqueSpecialities" :key="spec" :value="spec">{{ spec }}</option>
          </select>
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
      </div>

      <div v-if="filteredDoctors.length > 0" class="grid grid-cols-1 gap-2">
        <DoctorCard v-for="doctor in filteredDoctors" :key="doctor.id" :doctor="doctor" @edit="openEditModal" @delete="confirmDelete" />
      </div>

      <DoctorForm v-if="showModal" :doctor="editingDoctor" @close="showModal = false" @save="saveDoctor" />

      <transition name="fade">
        <Modal v-if="showDeleteModal" @close="closeDeleteModal">
          <div class="text-center p-4">
            <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic">Confirmation</h3>
            <p class="text-slate-500 font-medium mb-8">
              Voulez-vous vraiment supprimer le <span class="text-slate-900 font-bold underline">Dr. {{ doctorToDelete?.name }}</span> ?
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="closeDeleteModal" class="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">Annuler</button>
              <button @click="executeDelete" class="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform active:scale-95">Supprimer</button>
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