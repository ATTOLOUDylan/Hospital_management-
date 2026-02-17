<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  appointment: Object,
  patients: Array,
  doctors: Array
});

const emit = defineEmits(["save"]);

const form = reactive({
  id: null,
  patientId: "",
  doctorId: "",
  date: "",
  time: "",
  status: "programmé"
});

// Mettre à jour le formulaire quand props.appointment change
watch(
  () => props.appointment,
  (newVal) => {
    if (newVal) {
      Object.assign(form, newVal);
    }
  },
  { immediate: true }
);

function submit() {
  if (!form.patientId || !form.doctorId || !form.date || !form.time) {
    alert("Veuillez remplir tous les champs !");
    return;
  }
  emit("save", { ...form }); // On renvoie l'objet complet avec ID
}


</script>

<template>
  <div class="form-appointment">
    <label>Patient</label>
    <select v-model="form.patientId" required>
      <option value="">Sélectionner un patient</option>
      <option v-for="p in patients" :key="p.id" :value="p.id">
        {{ p.firstName }} {{ p.lastName }}
      </option>
    </select>

    <label>Médecin</label>
    <select v-model="form.doctorId" required>
      <option value="">Sélectionner un médecin</option>
      <option v-for="d in doctors" :key="d.id" :value="d.id">
        {{ d.name }} - {{ d.speciality }}
      </option>
    </select>

    <label>Date</label>
    <input type="date" v-model="form.date" required />

    <label>Heure</label>
    <input type="time" v-model="form.time" required />

    <label>Statut</label>
    <select v-model="form.status">
      <option value="programmé">Programmé</option>
      <option value="terminé">Terminé</option>
      <option value="annulé">Annulé</option>
    </select>

    <button @click="submit">{{ form.id ? 'Enregistrer' : 'Ajouter' }}</button>
  </div>
</template>

<style scoped>
.form-appointment {
  display: flex; flex-direction: column; gap: 10px;
}
input, select, button {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background: #1e8e6e;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
button:hover { background: #166f56; }
</style>
