<script setup>
import { defineProps, defineEmits } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  appointments: Array,
  patients: Array,
  doctors: Array
});
const emit = defineEmits(["edit", "delete"]);

function getPatientName(id) {
  const p = props.patients.find(p => p.id === id);
  return p ? `${p.firstName} ${p.lastName}` : "Inconnu";
}

function getDoctorName(id) {
  const d = props.doctors.find(d => d.id === id);
  return d ? d.name : "Inconnu";
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Patient</th>
        <th>Médecin</th>
        <th>Date</th>
        <th>Heure</th>
        <th>Statut</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a in appointments" :key="a.id">
        <td>{{ getPatientName(a.patientId) }}</td>
        <td>{{ getDoctorName(a.doctorId) }}</td>
        <td>{{ a.date }}</td>
        <td>{{ a.time }}</td>
        <td>{{ a.status }}</td>
        <td>
          <button @click="$emit('edit', a)">Modifier</button>
          <button @click="$emit('delete', a.id)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
button { margin-right: 5px; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
button:first-of-type { background: #1e8e6e; color: white; border: none; }
button:last-of-type { background: #e76f51; color: white; border: none; }
button:hover:first-of-type { background: #166f56; }
button:hover:last-of-type { background: #c94c3c; }
</style>
