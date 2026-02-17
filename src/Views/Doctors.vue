<script setup>
import { ref, onMounted } from "vue";
import DoctorForm from "@/Components/DoctorForm.vue";
import DoctorCard from "@/Components/DoctorCard.vue";

const doctors = ref([
  {
    id: 1,
    name: "Dr Koffi",
    speciality: "Ginécologie",
    phone: "0152624927",
    available: "Disponible",
  },
  {
    id: 2,
    name: "Dr TOSSA",
    speciality: "Pédiatrie",
    phone: "0152623927",
    available: "Indisponible",
  },
]);
const showModal = ref(false);
const editingDoctor = ref(null);

onMounted(() => {
  const saved = localStorage.getItem("doctors");
  if (saved) {
    doctors.value = JSON.parse(saved);
  } else {
    localStorage.setItem("doctors", JSON.stringify(doctors.value));
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
  if (editingDoctor.value) {
    // UPDATE
    const index = doctors.value.findIndex((d) => d.id === doctorData.id);
    doctors.value[index] = doctorData;
  } else {
    // CREATE
    doctorData.id = Date.now();
    doctors.value.push(doctorData);
  }

  saveToLocalStorage();
  showModal.value = false;
}

function deleteDoctor(id) {
  doctors.value = doctors.value.filter((d) => d.id !== id);
  saveToLocalStorage();
}
</script>

<template>
  <div id="Viewdoctor">
    <div id="Ajout">
        <button class="button-91" @click="openAddModal">Ajouter Médecin</button>
    </div>

    <DoctorCard
      v-for="doctor in doctors"
      :key="doctor.id"
      :doctor="doctor"
      @edit="openEditModal"
      @delete="deleteDoctor"
    />

    <DoctorForm
      v-if="showModal"
      :doctor="editingDoctor"
      @close="showModal = false"
      @save="saveDoctor"
    />
  </div>
</template>

<style scoped>
#Ajout{
    position: absolute;
    right: 50px;
    top: 100px;
}

/* CSS */
.button-91 {
  color: #fff;
  padding: 15px 25px;
  background-color: #1E8E6E;
  background-image: radial-gradient(93% 87% at 87% 89%, rgba(0, 0, 0, 0.23) 0%, transparent 86.18%), radial-gradient(66% 66% at 26% 20%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%);
  box-shadow: inset -3px -3px 9px rgba(255, 255, 255, 0.25), inset 0px 3px 9px rgba(255, 255, 255, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3), inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  font-weight: bold;
  font-size: 16px;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  cursor: pointer;
}

</style>

