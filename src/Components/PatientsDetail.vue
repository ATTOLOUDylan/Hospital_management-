<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const patient = ref(null);

onMounted(() => {
  const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
  patient.value = savedPatients.find((p) => p.id === Number(route.params.id));
});

// Fonction pour déclencher l'impression PDF
const downloadPDF = () => {
  window.print();
};
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-10 py-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900 print:bg-white print:p-0">
    
    <div v-if="patient" class="max-w-[1600px] mx-auto print-section">
      
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8 print:hidden">
        <div class="flex items-start gap-6">
          <button @click="$router.back()" class="group h-14 w-14 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-[#1E8E6E] hover:border-[#1E8E6E] hover:shadow-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="px-3 py-1 rounded-lg bg-[#1E8E6E]/10 text-[#1E8E6E] text-[10px] font-black uppercase tracking-widest">Dossier Actif</span>
              <span class="text-slate-400 text-xs font-bold uppercase tracking-tighter">ID: #{{ patient.id }}</span>
            </div>
            <h1 class="text-4xl font-black text-slate-800 tracking-tighter italic uppercase">
              {{ patient.lastName }} <span class="text-[#1E8E6E]">{{ patient.firstName }}</span>
            </h1>
          </div>
        </div>

        <div class="flex gap-4">
          <button @click="downloadPDF" class="flex items-center gap-3 bg-slate-800 text-white px-8 py-5 rounded-2xl font-black shadow-2xl hover:bg-slate-900 transition-all transform hover:-translate-y-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Télécharger PDF
          </button>

          <router-link :to="{ name: 'PatientsForm', params: { id: patient.id } }">
            <button class="flex items-center gap-3 bg-[#1E8E6E] text-white px-8 py-5 rounded-2xl font-black shadow-2xl shadow-[#1E8E6E]/20 hover:bg-[#166f56] transition-all transform hover:-translate-y-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Modifier
            </button>
          </router-link>
        </div>
      </div>

      <div class="hidden print:flex justify-between items-center mb-10 border-b-4 border-[#1E8E6E] pb-6">
        <div>
          <h2 class="text-3xl font-black uppercase italic">{{ patient.lastName }} {{ patient.firstName }}</h2>
          <p class="text-slate-500 font-bold">Dossier Médical Numérique - ID: #{{ patient.id }}</p>
        </div>
        <div class="text-right">
          <p class="font-black text-[#1E8E6E]">HÔPITAL GÉNÉRAL</p>
          <p class="text-xs text-slate-400 italic">Édité le {{ new Date().toLocaleDateString() }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 print:block print:space-y-6">
        
        <div class="lg:col-span-3 space-y-8 print:w-full">
          <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 print:rounded-2xl print:p-6 print:border-slate-200">
            <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[#1E8E6E] text-3xl font-black mb-6 border border-slate-100 print:hidden">
              {{ patient.lastName.charAt(0) }}{{ patient.firstName.charAt(0) }}
            </div>
            <div class="space-y-4 grid grid-cols-1 print:grid-cols-3 print:gap-4 print:space-y-0">
              <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Profession</p>
                <p class="text-slate-700 font-bold capitalize">{{ patient.profession || 'Non renseignée' }}</p>
              </div>
              <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Contact</p>
                <p class="text-slate-700 font-bold">{{ patient.phone }}</p>
              </div>
              <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Statut Patient</p>
                <div class="font-black uppercase text-sm" :class="patient.status === 'critique' ? 'text-rose-600' : 'text-emerald-600'">
                  {{ patient.status }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#1E8E6E] rounded-[2.5rem] p-8 text-white shadow-2xl print:bg-slate-100 print:text-slate-800 print:rounded-2xl print:shadow-none print:p-6">
            <h3 class="text-white/80 font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 print:text-rose-600">
              <span class="w-2 h-2 bg-rose-400 rounded-full print:bg-rose-600"></span>
              Contact d'Urgence
            </h3>
            <p class="text-xl font-bold leading-tight">{{ patient.emergencyContact || 'Non renseigné' }}</p>
          </div>
        </div>

        <div class="lg:col-span-9 space-y-10 print:w-full print:space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm print:p-4 print:rounded-xl">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Groupe Sanguin</p>
              <p class="text-4xl font-black text-rose-600 tracking-tighter print:text-2xl">{{ patient.bloodGroup || '--' }}</p>
            </div>
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm print:p-4 print:rounded-xl">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Médecin Référent</p>
              <p class="text-xl font-black text-slate-800 print:text-lg">Dr. {{ patient.doctorName || 'Non assigné' }}</p>
            </div>
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm print:p-4 print:rounded-xl">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assignation</p>
              <p class="text-xl font-black text-slate-800 print:text-lg">{{ patient.roomName ? 'Chambre ' + patient.roomName : 'Soin externe' }}</p>
            </div>
          </div>

          <div class="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 print:p-0 print:border-none">
            <div class="flex items-center gap-3 mb-10 print:mb-4">
              <div class="h-8 w-2 bg-[#1E8E6E] rounded-full print:h-6"></div>
              <h3 class="text-2xl font-black text-slate-800 tracking-tight print:text-xl uppercase italic">Observations</h3>
            </div>

            <div class="space-y-12 print:space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12 print:grid-cols-2 print:gap-6">
                <div class="space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Motif de consultation</label>
                  <p class="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 italic print:p-4 print:bg-transparent">
                    "{{ patient.consultationReason || 'Aucun motif renseigné.' }}"
                  </p>
                </div>
                <div class="space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Traitements en cours</label>
                  <p class="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 print:p-4 print:bg-transparent">
                    {{ patient.currentTreatments || 'Aucun traitement signalé.' }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Historique & Antécédents</label>
                <p class="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap print:text-sm">
                  {{ patient.personalHistory || 'Aucun antécédent particulier déclaré.' }}
                </p>
              </div>

              <div class="p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 print:p-6 print:rounded-xl print:bg-slate-50">
                <label class="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 block">Diagnostic Médical Établi</label>
                <p class="text-2xl font-black text-emerald-900 leading-tight print:text-xl">
                  {{ patient.diagnosis || 'En attente de diagnostic final...' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden print:block mt-20 text-center border-t border-slate-200 pt-6">
        <p class="text-[10px] text-slate-400 uppercase font-black tracking-widest">Document confidentiel - Usage Médical Strict</p>
      </div>
    </div>

    <div v-else class="max-w-xl mx-auto mt-32 text-center">
      <div class="text-8xl mb-6">🔍</div>
      <h2 class="text-3xl font-black text-slate-800 tracking-tight italic">Dossier inexistant</h2>
      <button @click="$router.push({ name: 'Patients' })" class="bg-[#1E8E6E] text-white px-12 py-5 rounded-2xl font-black mt-10">
        Retour à l'annuaire
      </button>
    </div>
  </div>
</template>

<style scoped>
/* CONFIGURATION A4 ET IMPRESSION */
@media print {
  @page {
    size: A4;
    margin: 15mm;
  }

  /* Cache tout sauf le contenu du dossier */
  body {
    background: white !important;
  }

  /* Utilise grid/flex Tailwind mais force l'adaptation */
  .print-section {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Supprime les ombres pour un rendu PDF propre */
  * {
    box-shadow: none !important;
    transition: none !important;
  }
}
</style>