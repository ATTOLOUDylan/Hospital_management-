
<!-- PatientForm -->
<script setup>
import { computed, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Détermine si on est en mode édition
const isEditing = computed(() => !!route.params.id);

// 1. OBJET PATIENT COMPLÉTÉ (Tous les nouveaux champs sont ici)
const patient = reactive({
  id: null,
  firstName: "",
  lastName: "",
  gender: "masculin",
  bloodGroup: "",
  status: "",
  phone: "",
  doctorId: null,
  doctorName: "",
  roomId: null,
  roomName: "",
  // --- Nouveaux champs ajoutés ---
  familyStatus: "",
  profession: "",
  guardianName: "",
  emergencyContact: "",
  lifestyle: "",
  familyHistory: "",
  personalHistory: "",
  currentTreatments: "",
  consultationReason: "",
  symptoms: "",
  diagnosis: "",
  testResults: "",
  insurance: "",
  consentSigned: false,
});

// Données auxiliaires
const doctors = reactive([]);
const rooms = reactive([]);

// Charger médecins, chambres et patient à éditer
onMounted(() => {
  const savedDoctors = localStorage.getItem("doctors");
  doctors.push(...(savedDoctors ? JSON.parse(savedDoctors) : []));

  const savedRooms = localStorage.getItem("rooms");
  rooms.push(...(savedRooms ? JSON.parse(savedRooms) : []));

  if (isEditing.value) {
    const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    const existing = savedPatients.find(p => p.id === Number(route.params.id));
    if (existing) {
      // Object.assign recopie toutes les propriétés existantes dans l'objet réactif
      Object.assign(patient, existing);
    }
  }
});

// 🔹 Watch : mettre à jour doctorName
watch(
  () => patient.doctorId,
  (newId) => {
    const selectedDoctor = doctors.find(d => d.id === Number(newId));
    patient.doctorName = selectedDoctor ? selectedDoctor.name : "";
  }
);

// 🔹 Watch : mettre à jour roomName
watch(
  () => patient.roomId,
  (newId) => {
    const selectedRoom = rooms.find(r => r.id === Number(newId));
    patient.roomName = selectedRoom ? selectedRoom.numero : "";
  }
);

// 2. SAUVEGARDE (Inclusion automatique de tous les champs réactifs)
function savePatient() {
  const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");

  // On s'assure que les noms sont synchronisés avant de sauvegarder
  const selectedDoctor = doctors.find(d => d.id === Number(patient.doctorId));
  patient.doctorName = selectedDoctor ? selectedDoctor.name : null;

  const selectedRoom = rooms.find(r => r.id === Number(patient.roomId));
  patient.roomName = selectedRoom ? selectedRoom.numero : null;

  if (isEditing.value) {
    const index = savedPatients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      // Sauvegarde de l'objet patient complet (incluant les nouveaux champs)
      savedPatients[index] = { ...patient };
    }
  } else {
    // Création d'un nouveau patient
    savedPatients.push({
      ...patient,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
    });
  }

  localStorage.setItem("patients", JSON.stringify(savedPatients));
  
  // Redirection vers la liste
  router.push({ name: "Patients" });
}
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-12 py-8 bg-gray-50/50 min-h-screen">
    
    <div class="max-w-5xl mx-auto mb-8 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="$router.back()" class="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#1E8E6E] hover:border-[#1E8E6E] transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-black text-gray-800 tracking-tight">
            {{ isEditing ? "Modification du Dossier" : "Nouveau Dossier Médical" }}
          </h1>
          <p class="text-sm text-gray-500 font-medium tracking-tight">Dossier complet informatisé.</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="savePatient" class="max-w-5xl mx-auto space-y-8 pb-20">
      
      <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
          <div class="p-2 bg-[#1E8E6E]/10 rounded-lg text-[#1E8E6E]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800">Identité & Informations Sociales</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Nom</label>
            <input v-model="patient.lastName" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" required />
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Prénom</label>
            <input v-model="patient.firstName" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" required />
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Profession</label>
            <input v-model="patient.profession" type="text" placeholder="Ex: Enseignant" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" />
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Situation Familiale</label>
            <select v-model="patient.familyStatus" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none">
              <option value="célibataire">Célibataire</option>
              <option value="marié">Marié(e)</option>
              <option value="divorcé">Divorcé(e)</option>
              <option value="veuf">Veuf/Veuve</option>
            </select>
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Tuteur légal (mineur)</label>
            <input v-model="patient.guardianName" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" />
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Contact d'urgence (Nom & Tel)</label>
            <input v-model="patient.emergencyContact" type="text" placeholder="Obligatoire" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" required />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
          <div class="p-2 bg-orange-100 rounded-lg text-orange-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800">Antécédents & Mode de vie</h2>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Habitudes (Tabac, Alcool, Sport)</label>
              <textarea v-model="patient.lifestyle" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none resize-none"></textarea>
            </div>
            <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Antécédents Familiaux</label>
              <textarea v-model="patient.familyHistory" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none resize-none" placeholder="Diabète, HTA..."></textarea>
            </div>
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Traitements actuels</label>
            <textarea v-model="patient.currentTreatments" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
          <div class="p-2 bg-red-100 rounded-lg text-red-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800">Informations Cliniques</h2>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Symptômes rapportés</label>
              <textarea v-model="patient.symptoms" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none resize-none"></textarea>
            </div>
            <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Résultats d'examens (Labo, Imagerie)</label>
              <textarea v-model="patient.testResults" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none resize-none"></textarea>
            </div>
          </div>
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Diagnostic Médical</label>
            <textarea v-model="patient.diagnosis" rows="2" class="w-full px-4 py-3 rounded-xl border border-[#1E8E6E]/30 bg-[#1E8E6E]/5 focus:bg-white outline-none resize-none font-bold text-[#1E8E6E]"></textarea>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
          <div class="p-2 bg-blue-100 rounded-lg text-blue-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800">Administration & Suivi</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2"><label class="text-xs font-black uppercase text-gray-400">Assurance / Mutuelle</label>
            <input v-model="patient.insurance" type="text" placeholder="Nom de l'assurance" class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" />
          </div>
          <div class="flex items-center gap-4 mt-8">
            <input v-model="patient.consentSigned" type="checkbox" id="consent" class="w-5 h-5 accent-[#1E8E6E]" />
            <label for="consent" class="text-sm font-bold text-gray-700">Consentement aux soins signé</label>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-4">
        <button type="submit" class="w-full md:w-auto px-12 py-4 bg-[#1E8E6E] text-white font-black rounded-2xl shadow-xl hover:bg-[#166f56] transition-all active:scale-95">
          {{ isEditing ? "Enregistrer les modifications" : "Créer le dossier patient" }}
        </button>
      </div>

    </form>
  </div>
</template>

 