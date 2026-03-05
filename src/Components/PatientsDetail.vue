<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// Assure-toi que html2pdf.js est installé : npm install html2pdf.js
import html2pdf from "html2pdf.js"; 

const route = useRoute();
const patient = ref(null);

onMounted(() => {
  const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
  patient.value = savedPatients.find((p) => p.id === Number(route.params.id));
});

const downloadPDF = () => {
  const element = document.getElementById("pdf-content");
  
  const options = {
    margin: [10, 10, 10, 10],
    filename: `Dossier_${patient.value.lastName}_${patient.value.firstName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      letterRendering: true,
      logging: false 
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(element).save();
};
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-10 py-10 bg-[#f8fafc] min-h-screen font-sans text-[#0f172a]">
    
    <div v-if="patient" class="max-w-[1600px] mx-auto">
      
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-[#e2e8f0] pb-8">
        <div class="flex items-start gap-6">
          <button @click="$router.back()" class="h-14 w-14 flex items-center justify-center rounded-2xl bg-white border border-[#e2e8f0] text-[#94a3b8] hover:text-[#1E8E6E] hover:border-[#1E8E6E] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="px-3 py-1 rounded-lg bg-[#1E8E6E]/10 text-[#1E8E6E] text-[10px] font-black uppercase tracking-widest">Dossier Actif</span>
              <span class="text-[#94a3b8] text-xs font-bold">ID: #{{ patient.id }}</span>
            </div>
            <h1 class="text-4xl font-black text-[#1e293b] tracking-tighter italic uppercase">
              {{ patient.lastName }} <span class="text-[#1E8E6E]">{{ patient.firstName }}</span>
            </h1>
          </div>
        </div>

        <div class="flex gap-4">
          <button @click="downloadPDF" class="flex items-center gap-3 bg-[#1e293b] text-white px-8 py-5 rounded-2xl font-black hover:bg-[#0f172a] transition-all transform hover:-translate-y-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Télécharger PDF
          </button>

          <router-link :to="{ name: 'PatientsForm', params: { id: patient.id } }">
            <button class="flex items-center gap-3 bg-[#1E8E6E] text-white px-8 py-5 rounded-2xl font-black hover:bg-[#166f56] transition-all transform hover:-translate-y-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Modifier
            </button>
          </router-link>
        </div>
      </div>

      <div id="pdf-content" class="bg-white p-10 rounded-[2.5rem] border border-[#f1f5f9]">
        
        <div class="flex justify-between items-center mb-10 border-b-4 border-[#1E8E6E] pb-6">
          <div>
            <h2 class="text-3xl font-black uppercase italic text-[#1e293b]">{{ patient.lastName }} {{ patient.firstName }}</h2>
            <p class="font-bold text-sm text-[#64748b]">Dossier Médical Numérique - ID: #{{ patient.id }}</p>
          </div>
          <div class="text-right">
            <p class="font-black text-[#1E8E6E] text-xl">HÔPITAL GÉNÉRAL</p>
            <p class="text-xs italic font-medium text-[#94a3b8]">Édité le {{ new Date().toLocaleDateString() }}</p>
          </div>
        </div>

        <div class="flex flex-row gap-10">
          <div class="w-1/3 space-y-6">
            <div class="bg-[#f8fafc] rounded-3xl p-6 border border-[#f1f5f9]">
              <div class="space-y-4">
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest mb-1 text-[#94a3b8]">Profession</p>
                  <p class="font-bold text-[#334155]">{{ patient.profession || 'Non renseignée' }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest mb-1 text-[#94a3b8]">Contact</p>
                  <p class="font-bold text-[#334155]">{{ patient.phone }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest mb-1 text-[#94a3b8]">Statut</p>
                  <p class="font-black uppercase text-sm" :class="patient.status === 'critique' ? 'text-[#e11d48]' : 'text-[#10b981]'">
                    {{ patient.status }}
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-[#fff1f2] rounded-3xl p-6 border border-[#ffe4e6]">
              <h3 class="font-black text-[10px] uppercase tracking-widest mb-2 text-[#e11d48]">Urgence</h3>
              <p class="font-bold leading-tight text-[#1e293b]">{{ patient.emergencyContact || 'Non renseigné' }}</p>
            </div>
          </div>

          <div class="w-2/3 space-y-8">
            <div class="flex flex-row gap-4">
              <div class="flex-1 bg-white p-4 rounded-2xl border border-[#f1f5f9] text-center">
                <p class="text-[9px] font-black uppercase mb-1 text-[#94a3b8]">Groupe</p>
                <p class="text-2xl font-black text-[#e11d48]">{{ patient.bloodGroup || '--' }}</p>
              </div>
              <div class="flex-1 bg-white p-4 rounded-2xl border border-[#f1f5f9] text-center">
                <p class="text-[9px] font-black uppercase mb-1 text-[#94a3b8]">Médecin</p>
                <p class="text-sm font-black text-[#1e293b]">Dr. {{ patient.doctorName || 'N/A' }}</p>
              </div>
              <div class="flex-1 bg-white p-4 rounded-2xl border border-[#f1f5f9] text-center">
                <p class="text-[9px] font-black uppercase mb-1 text-[#94a3b8]">Assignation</p>
                <p class="text-sm font-black text-[#1e293b]">{{ patient.roomName || 'Externe' }}</p>
              </div>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <h3 class="text-sm font-black uppercase italic flex items-center gap-2 text-[#1e293b]">
                  <span class="w-1.5 h-4 bg-[#1E8E6E] rounded-full"></span> Observations
                </h3>
                <div class="p-4 bg-[#f8fafc] rounded-2xl border border-[#f1f5f9] text-sm italic text-[#475569]">
                  "{{ patient.consultationReason || 'Aucun motif renseigné.' }}"
                </div>
              </div>

              <div class="space-y-2">
                <h3 class="text-sm font-black uppercase italic flex items-center gap-2 text-[#1e293b]">
                  <span class="w-1.5 h-4 bg-[#1E8E6E] rounded-full"></span> Antécédents
                </h3>
                <p class="text-sm leading-relaxed pl-4 text-[#334155]">{{ patient.personalHistory || 'Aucun.' }}</p>
              </div>

              <div class="p-6 bg-[#ecfdf5] rounded-2xl border border-[#d1fae5]">
                <p class="text-[9px] font-black uppercase mb-2 text-[#059669]">Diagnostic Établi</p>
                <p class="text-lg font-black capitalize text-[#064e3b]">{{ patient.diagnosis || 'En attente...' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center border-t border-[#f1f5f9] pt-6">
          <p class="text-[9px] uppercase font-black tracking-[0.3em] text-[#94a3b8]">Document confidentiel - Usage Médical Strict</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
#pdf-content {
  background-color: #ffffff !important;
}
</style>