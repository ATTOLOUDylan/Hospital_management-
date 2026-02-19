<script setup>

import { ref, watch } from "vue";

const props = defineProps({
  doctor: Object,
});

const emit = defineEmits(["close", "save"]);

const form = ref({
  id: null,
  name: "",
  phone: "",
  speciality: "",
  available: true,
  gender: "",
  password: "",
  role: "doctor"
});

watch(
  () => props.doctor,
  (newVal) => {
    if (newVal) {
      form.value = {
        ...newVal,
        role: "doctor",
        password: ""
      };
    } else {
      form.value = {
        id: null,
        name: "",
        phone: "",
        speciality: "",
        available: true,
        gender: "",
        password: "",
        role: "doctor"
      };
    }
  },
  { immediate: true }
);

function submit() {
  emit("save", form.value);
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>{{ doctor ? "Modifier Médecin" : "Ajouter Médecin" }}</h2>

      <form @submit.prevent="submit" id="formulaire">
        <input v-model="form.name" placeholder="Nom" required />

        <input v-model="form.phone" placeholder="Téléphone" required />

        <select v-model="form.speciality" required>
          <option disabled value="">Choisir spécialité</option>
          <option value="Gynécologie">Gynécologie</option>
          <option value="Pédiatrie">Pédiatrie</option>
          <option value="Chirurgie">Chirurgie</option>
          <option value="Biologiste">Biologiste</option>
        </select>

        <input
          v-model="form.password"
          type="password"
          placeholder="Mot de passe"
          :required="!doctor"
        />

        <input
          v-model="form.role"
          disabled
        />

        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="form.available" />
            Disponible
          </label>
        </div>

        <div class="radio-group">
          <label>Genre :</label>

          <label>
            <input type="radio" value="Homme" v-model="form.gender" />
            Homme
          </label>

          <label>
            <input type="radio" value="Femme" v-model="form.gender" />
            Femme
          </label>
        </div>

        <div class="actions">
          <button type="submit">Enregistrer</button>
          <button type="button" @click="$emit('close')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease;
}

.modal h2 {
  margin-bottom: 1.5rem;
  color: #1E8E6E;
  text-align: center;
  font-weight: 600;
}

#formulaire {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
select {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #D1E7E1;
  outline: none;
  transition: 0.2s ease;
  font-size: 0.95rem;
}

input:focus,
select:focus {
  border-color: #1E8E6E;
  box-shadow: 0 0 0 3px rgba(30, 142, 110, 0.15);
}

input:disabled {
  background: #f3f4f6;
  color: #6b7280;
}

.checkbox-group,
.radio-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
  color: #374151;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;
}

button[type="submit"] {
  background: #1E8E6E;
  color: white;
}

button[type="submit"]:hover {
  background: #166F56;
}

button[type="button"] {
  background: #f3f4f6;
  color: #374151;
}

button[type="button"]:hover {
  background: #e5e7eb;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
