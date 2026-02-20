<script setup>
import { ref, onMounted, computed } from 'vue';
import Modal from "@/Components/Modal.vue"; // Importation du modal

const complaints = ref([]);
const user = ref(JSON.parse(localStorage.getItem("currentUser") || "{}"));

// Formulaire pour Médecin/Réceptionniste
const newComplaint = ref({ subject: '', description: '' });

// États pour les Modaux
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const complaintToDelete = ref(null);

onMounted(() => {
  loadComplaints();
});

function loadComplaints() {
  const saved = localStorage.getItem("complaints");
  complaints.value = saved ? JSON.parse(saved) : [];
}

function saveComplaints() {
  localStorage.setItem("complaints", JSON.stringify(complaints.value));
}

// --- ACTIONS MÉDECIN / RECEPTIONNISTE ---
function submitComplaint() {
  if (!newComplaint.value.subject || !newComplaint.value.description) return;

  const complaint = {
    id: Date.now(),
    from: user.value.Name,
    role: user.value.role,
    subject: newComplaint.value.subject,
    description: newComplaint.value.description,
    status: 'En attente',
    createdAt: new Date().toLocaleString()
  };

  complaints.value.push(complaint);
  saveComplaints();
  newComplaint.value = { subject: '', description: '' };
  
  // Notification de succès au lieu de l'alert
  showSuccessModal.value = true;
  setTimeout(() => showSuccessModal.value = false, 2000);
}

// --- ACTIONS ADMIN ---
function takeCharge(id) {
  const index = complaints.value.findIndex(c => c.id === id);
  if (index !== -1) {
    complaints.value[index].status = 'Prise en charge';
    saveComplaints();
  }
}

function confirmDelete(item) {
  complaintToDelete.value = item;
  showDeleteModal.value = true;
}

function executeDelete() {
  if (complaintToDelete.value) {
    complaints.value = complaints.value.filter(c => c.id !== complaintToDelete.value.id);
    saveComplaints();
  }
  showDeleteModal.value = false;
  complaintToDelete.value = null;
}

// Filtrage pour l'utilisateur (il ne voit que les siennes s'il n'est pas Admin)
const displayComplaints = computed(() => {
  if (user.value.role === 'Admin') return complaints.value;
  return complaints.value.filter(c => c.from === user.value.Name);
});
</script>

<template>
  <div class="p-8 bg-[#f8fafc] min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-black text-slate-800 mb-8 uppercase italic tracking-tight">
        {{ user.role === 'Admin' ? 'Gestion des Plaintes' : 'Mes Plaintes' }}
      </h1>

      <div v-if="user.role !== 'Admin'" class="bg-white p-6 rounded-[2rem] shadow-sm mb-10 border border-slate-100">
        <h2 class="text-xl font-bold text-slate-700 mb-4">Signaler un problème</h2>
        <div class="space-y-4">
          <input v-model="newComplaint.subject" type="text" placeholder="Sujet de la plainte" class="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1E8E6E]/20 font-medium" />
          <textarea v-model="newComplaint.description" placeholder="Description détaillée..." class="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1E8E6E]/20 h-32 font-medium"></textarea>
          <button @click="submitComplaint" class="bg-[#1E8E6E] text-white px-8 py-3 rounded-xl font-black hover:bg-[#166f56] transition-all transform active:scale-95 shadow-lg shadow-[#1E8E6E]/20">
            Envoyer la plainte
          </button>
        </div>
      </div>

      <div class="grid gap-4">
        <div v-for="item in displayComplaints" :key="item.id" 
             class="bg-white p-6 rounded-2xl border-l-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center transition-all hover:shadow-md"
             :class="item.status === 'Prise en charge' ? 'border-[#1E8E6E]' : 'border-rose-400'">
          
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-black uppercase px-2 py-1 rounded bg-slate-100 text-slate-500">{{ item.role }}</span>
              <span class="text-xs text-slate-400 font-bold">{{ item.createdAt }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800">{{ item.subject }}</h3>
            <p class="text-slate-600 mt-1 font-medium">{{ item.description }}</p>
            <p class="text-sm font-bold mt-2 italic text-slate-400">Par: {{ item.from }}</p>
            
            <div v-if="item.status === 'Prise en charge' && user.role !== 'Admin'" class="mt-3 p-3 bg-emerald-50 text-[#1E8E6E] rounded-lg text-sm font-bold flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
              L'administration a décidé de prendre en compte votre plainte.
            </div>
          </div>

          <div class="mt-4 md:mt-0 flex gap-2">
            <template v-if="user.role === 'Admin'">
              <button v-if="item.status === 'En attente'" @click="takeCharge(item.id)" class="px-4 py-2 bg-emerald-100 text-[#1E8E6E] rounded-lg font-black text-xs uppercase hover:bg-emerald-200 transition-all">
                Gérer la plainte
              </button>
              <button @click="confirmDelete(item)" class="px-4 py-2 bg-rose-50 text-rose-500 rounded-lg font-black text-xs uppercase hover:bg-rose-100 transition-all">
                Supprimer
              </button>
            </template>
            
            <div v-else class="px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest" :class="item.status === 'Prise en charge' ? 'bg-emerald-100 text-[#1E8E6E]' : 'bg-rose-100 text-rose-500'">
              {{ item.status }}
            </div>
          </div>
        </div>

        <div v-if="displayComplaints.length === 0" class="text-center py-20 opacity-40">
          <p class="text-xl font-bold italic">Aucune plainte enregistrée.</p>
        </div>
      </div>
    </div>

    <transition name="fade">
      <Modal v-if="showDeleteModal" @close="showDeleteModal = false">
        <div class="text-center p-4">
          <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </div>
          <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic">Supprimer ?</h3>
          <p class="text-slate-500 font-medium mb-8">
            Voulez-vous supprimer définitivement la plainte de <span class="text-slate-900 font-bold underline">{{ complaintToDelete?.from }}</span> concernant <span class="font-bold">"{{ complaintToDelete?.subject }}"</span> ?
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="showDeleteModal = false" class="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">Annuler</button>
            <button @click="executeDelete" class="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all transform active:scale-95">Confirmer</button>
          </div>
        </div>
      </Modal>
    </transition>

    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed bottom-10 right-10 z-50 bg-[#1E8E6E] text-white px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-3 animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
        PLAINTE ENVOYÉE !
      </div>
    </transition>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>