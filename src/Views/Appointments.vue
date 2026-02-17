<script setup>
import { ref, onMounted } from "vue";
import Modal from "@/Components/Modal.vue";
import AppointmentsList from "@/Components/AppointmentsList.vue";
import AppointmentForm from "@/Components/AppointmentForm.vue";

const appointments = ref([]);
const patients = ref([]);
const doctors = ref([]);
const showModal = ref(false);
const editingAppointment = ref(null);

onMounted(() => {
    appointments.value = JSON.parse(localStorage.getItem("appointments") || "[]");
    patients.value = JSON.parse(localStorage.getItem("patients") || "[]");
    doctors.value = JSON.parse(localStorage.getItem("doctors") || "[]");
});

function openModal(appointment = null) {
    if (appointment) {
        // Copier toutes les propriétés pour éviter liaison directe
        editingAppointment.value = { ...appointment };
    } else {
        // Nouveau rendez-vous
        editingAppointment.value = {
            id: null,
            patientId: "",
            doctorId: "",
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
    // Vérification des conflits (ignore le rendez-vous actuel)
    const conflict = appointments.value.some(a =>
        a.doctorId === appointment.doctorId &&
        a.date === appointment.date &&
        a.time === appointment.time &&
        a.id !== appointment.id // important !
    );
    if (conflict) {
        alert("Ce créneau est déjà réservé !");
        return;
    }

    if (appointment.id) {
        // modifier
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
</script>

<template>
    <div>
        <h2>Gestion des Rendez-vous</h2>
        <button @click="openModal()" class="button-91" style="margin-bottom:10px;">+ Ajouter un rendez-vous</button>

        <AppointmentsList :appointments="appointments" :patients="patients" :doctors="doctors" @edit="openModal"
            @delete="deleteAppointment" />

        <Modal v-if="showModal" @close="closeModal">
            <AppointmentForm :appointment="editingAppointment" :patients="patients" :doctors="doctors"
                @save="saveAppointment" />
        </Modal>
    </div>
</template>
<style scoped>
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
    position: absolute;
    right: 50px;
    top: 100px;
}
</style>