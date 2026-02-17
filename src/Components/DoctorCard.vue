<script setup>
const props = defineProps({
  doctor: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

function handleEdit() {
  emit("edit", props.doctor);
}

function handleDelete() {
  emit("delete", props.doctor.id);
}
</script>

<template>
  <div class="doctor-card">
    <div class="doctor-info">
      <h3>{{ doctor.name }}</h3>
      <p>{{ doctor.speciality }}</p>
      <p>{{ doctor.phone }}</p>
    </div>

    <span
      class="status"
      :class="{ available: doctor.available, unavailable: !doctor.available }"
    >
      {{ doctor.available ? "Disponible" : "Indisponible" }}
    </span>

    <div class="card-actions">
      <button class="edit" @click="handleEdit">Modifier</button>
      <button class="delete" @click="handleDelete">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
.doctor-card {
  margin-left: 200px;
  margin-top: 50px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border-left: 5px solid #1e8e6e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: 0.2s ease;
  margin-bottom: 1rem;
}

.doctor-card:hover {
  transform: translateY(-2px);
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
}

.doctor-info h3 {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 600;
  min-width: 150px;
}

.doctor-info p {
  color: #4b5563;
  font-size: 0.9rem;
  min-width: 120px;
}

.status {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 2rem;
}

.available {
  background: #e6f4f1;
  color: #1e8e6e;
}

.unavailable {
  background: #fde2e2;
  color: #dc3545;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.card-actions button {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s ease;
}

button.edit {
  background: #1e8e6e;
  color: white;
}

button.edit:hover {
  background: #166f56;
}

button.delete {
  background: #f3f4f6;
  color: #374151;
}

button.delete:hover {
  background: #e5e7eb;
}
</style>
