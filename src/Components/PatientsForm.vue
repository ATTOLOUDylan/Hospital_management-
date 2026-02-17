<script setup>
import { computed, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isEditing = computed(() => !!route.params.id);

const patient = reactive({
  id: null,
  patientLastName: "",
  patientFirstName: "",
  patientSex: "",
  patientGender: "",
  patientBloodGroup: "",
  patientStatus: "",
  patientPhone: "",
});

onMounted(() => {
  if (isEditing.value) {
    const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    const existing = savedPatients.find(
      (p) => p.id === Number(route.params.id),
    );

    if (existing) {
      patient.id = existing.id;
      patient.patientLastName = existing.lastName;
      patient.patientFirstName = existing.firstName;
      patient.patientSex = existing.gender;
      patient.patientBloodGroup = existing.bloodGroup;
      patient.patientStatus = existing.status;
      patient.patientPhone = existing.phone;
    }
  }
});

function addPatient() {
  const existingPatients = JSON.parse(localStorage.getItem("patients") || "[]");

  if (isEditing.value) {
    // LOGIQUE DE MISE À JOUR
    const index = existingPatients.findIndex((p) => p.id === patient.id);
    if (index !== -1) {
      existingPatients[index] = {
        ...existingPatients[index], // on garde la date de création
        firstName: patient.patientFirstName,
        lastName: patient.patientLastName,
        gender: patient.patientSex,
        bloodGroup: patient.patientBloodGroup,
        status: patient.patientStatus,
        phone: patient.patientPhone,
      };
    }
  } else {
    const newPatient = {
      id: Date.now(),
      firstName: patient.patientFirstName,
      lastName: patient.patientLastName,
      gender: patient.patientSex,
      bloodGroup: patient.patientBloodGroup,
      status: patient.patientStatus,
      phone: patient.patientPhone,
      createdAt: new Date().toLocaleDateString(),
    };
    existingPatients.push(newPatient);
  }

  localStorage.setItem("patients", JSON.stringify(existingPatients));

  router.push({ name: "Patients" });
}
</script>

<template>
  <div class="container">
    <button @click="$router.back()" class="backbut">←</button>
    <h2>{{ isEditing ? "Modifier le patient" : "Ajouter un patient" }}</h2>
    <form @submit.prevent="addPatient(patient)">
      <label for="name">Nom</label><br />
      <input v-model="patient.patientLastName" id="name" type="text" />
      <label for="prenom">Prenom</label><br />
      <input v-model="patient.patientFirstName" id="prenom" type="text" />
      <label for="sex">Sexe</label><br />
      <div class="gender">
        <label for="mas">Masculin</label>
        <input
          id="mas"
          value="masculin"
          v-model="patient.patientSex"
          type="radio"
        />
        <label for="fem">Feminin</label>
        <input
          id="fem"
          value="féminin"
          v-model="patient.patientSex"
          type="radio"
        />
      </div>
      <label for="bg">Groupe Sanguin</label><br />
      <select v-model="patient.patientBloodGroup" name="bloodgroup" id="bg">
        <option value="">Sélectionner</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O-">O-</option>
        <option value="O-">O-</option>
      </select>
      <label for="status">Statut</label><br />
      <select v-model="patient.patientStatus" name="status" id="status">
        <option value="">Sélectionner</option>
        <option value="Stable/Bon">Stable/Bon</option>
        <option value="En observation">En observation</option>
        <option value="Critique">Critique</option>
        <option value="Réservé / Préoccupant">Réservé / Préoccupant</option>
      </select>
      <label for="phone">N° de téléphone</label><br />
      <input v-model="patient.patientPhone" type="number" />
      <button type="submit" class="register">
        {{ isEditing ? "Enregistrer les modifications" : "Enregistrer" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #1e8e6e;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
label {
  font-weight: 600;
  color: #444;
  margin-bottom: -10px;
}
input,
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
input:focus {
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
}
.backbut {
  background: none;
  border: none;
  font-size: 20px;
  color: #1e8e6e;
  cursor: pointer;
}
</style>


</script>


<template>



</template>


<style scoped>


</style>
