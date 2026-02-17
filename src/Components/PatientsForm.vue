<script setup>
import { computed, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Détermine si on est en mode édition
const isEditing = computed(() => !!route.params.id);

// Objet patient réactif
const patient = reactive({
  id: null,
  firstName: "",
  lastName: "",
  gender: "",       // "masculin" ou "féminin"
  bloodGroup: "",   // O+, O-, A+, ...
  status: "",       // consultation, hospitalisé, Critique, ...
  phone: "",
  doctorId: null,
  roomId: null,
});

// Données auxiliaires
const doctors = reactive([]);
const rooms = reactive([]);

// Chargement initial
onMounted(() => {
  // Médecins
  const savedDoctors = localStorage.getItem("doctors");
  doctors.push(...(savedDoctors ? JSON.parse(savedDoctors) : []));

  // Chambres
  const savedRooms = localStorage.getItem("rooms");
  rooms.push(...(savedRooms ? JSON.parse(savedRooms) : []));

  if (isEditing.value) {
    const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    const existing = savedPatients.find(p => p.id === Number(route.params.id));

    if (existing) {
      patient.id = existing.id;
      patient.firstName = existing.firstName;
      patient.lastName = existing.lastName;
      patient.gender = existing.gender;
      patient.bloodGroup = existing.bloodGroup;
      patient.status = existing.status;
      patient.phone = existing.phone;
      patient.doctorId = existing.doctorId;
      patient.roomId = existing.roomId;
    }
  }
});

// Ajouter ou modifier un patient
function savePatient() {
  const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");

  if (isEditing.value) {
    const index = savedPatients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      savedPatients[index] = {
        ...savedPatients[index],
        firstName: patient.firstName,
        lastName: patient.lastName,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        status: patient.status,
        phone: patient.phone,
        doctorId: patient.doctorId,
        roomId: patient.roomId,
      };
    }
  } else {
    savedPatients.push({
      id: Date.now(),
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      status: patient.status,
      phone: patient.phone,
      doctorId: patient.doctorId,
      roomId: patient.roomId,
      createdAt: new Date().toLocaleDateString(),
    });
  }

  localStorage.setItem("patients", JSON.stringify(savedPatients));
  router.push({ name: "Patients" });
}
</script>

<template>
  <div class="container">
    <button @click="$router.back()" class="backbut">←</button>
    <h2>{{ isEditing ? "Modifier le patient" : "Ajouter un patient" }}</h2>
    <form @submit.prevent="savePatient">
      <!-- Nom / Prénom -->
      <label>Nom</label>
      <input v-model="patient.lastName" type="text" placeholder="Nom du patient" required />
      
      <label>Prénom</label>
      <input v-model="patient.firstName" type="text" placeholder="Prénom du patient" required />

      <!-- Sexe -->
      <label>Sexe</label>
      <div class="gender">
        <label>Masculin
          <input type="radio" value="masculin" v-model="patient.gender" />
        </label>
        <label>Féminin
          <input type="radio" value="féminin" v-model="patient.gender" />
        </label>
      </div>

      <!-- Groupe sanguin -->
      <label>Groupe Sanguin</label>
      <select v-model="patient.bloodGroup" required>
        <option value="">Sélectionner</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
      </select>

      <!-- Statut -->
      <label>Statut</label>
      <select v-model="patient.status" required>
        <option value="">Sélectionner</option>
        <option value="consultation">Consultation</option>
        <option value="hospitalisé">Hospitalisé</option>
        <option value="critique">Critique</option>
        <option value="préoccupant">Réservé / Préoccupant</option>
      </select>

      <!-- Téléphone -->
      <label>N° de téléphone</label>
      <input v-model="patient.phone" type="tel" placeholder="Ex: 0023456789" required />

      <!-- Médecin -->
      <label>Médecin assigné</label>
      <select v-model="patient.doctorId">
        <option value="">Non assigné</option>
        <option v-for="doc in doctors" :key="doc.id" :value="doc.id">
          {{ doc.name }} - {{ doc.speciality }}
        </option>
      </select>

      <!-- Chambre -->
      <label>Chambre</label>
      <select v-model="patient.roomId">
        <option value="">Non assignée</option>
        <option v-for="room in rooms" :key="room.id" :value="room.id">
          {{ room.number }} ({{ room.status }})
        </option>
      </select>

      <button type="submit" class="register">
        {{ isEditing ? "Enregistrer les modifications" : "Enregistrer" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
h2 {
  color: #1e8e6e;
  text-align: center;
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
label {
  font-weight: 600;
  color: #444;
}
input, select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
input:focus, select:focus {
  border-color: #1e8e6e;
  outline: none;
}
.gender {
  display: flex;
  gap: 20px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 6px;
}
.register {
  background-color: #1e8e6e;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}
.register:hover {
  background-color: #166f56;
}
.backbut {
  background: none;
  border: none;
  font-size: 20px;
  color: #1e8e6e;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
