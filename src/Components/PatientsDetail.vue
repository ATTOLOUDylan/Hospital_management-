<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const patient = ref(null); // Changé de "patients" à "patient" pour la clarté

onMounted(() => {
  const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
  patient.value = savedPatients.find((p) => p.id === Number(route.params.id));
});
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-10 py-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
    
    <div v-if="patient" class="max-w-[1600px] mx-auto">
      
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
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

        <router-link :to="{ name: 'PatientsForm', params: { id: patient.id } }">
          <button class="flex items-center gap-3 bg-[#1E8E6E] text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-[#1E8E6E]/20 hover:bg-[#166f56] transition-all transform hover:-translate-y-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Modifier le dossier
          </button>
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div class="lg:col-span-3 space-y-8">
          <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[#1E8E6E] text-3xl font-black mb-6 border border-slate-100">
              {{ patient.lastName.charAt(0) }}{{ patient.firstName.charAt(0) }}
            </div>
            <div class="space-y-4">
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
                <div :class="[
                  'inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border mt-1',
                  patient.status === 'critique' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                ]">
                  {{ patient.status }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#1E8E6E] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-[#1E8E6E]/20 relative overflow-hidden">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
            
            <h3 class="text-white/80 font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span class="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
              Urgence
            </h3>
            <p class="text-xl font-bold leading-tight relative z-10">{{ patient.emergencyContact || 'Non renseigné' }}</p>
          </div>
        </div>

        <div class="lg:col-span-9 space-y-10">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#1E8E6E]/30 transition-all">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Groupe Sanguin</p>
              <p class="text-4xl font-black text-rose-600 tracking-tighter">{{ patient.bloodGroup || '--' }}</p>
            </div>
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#1E8E6E]/30 transition-all">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Médecin Référent</p>
              <p class="text-xl font-black text-slate-800">Dr. {{ patient.doctorName || 'Non assigné' }}</p>
            </div>
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#1E8E6E]/30 transition-all">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assignation</p>
              <p class="text-xl font-black text-slate-800">{{ patient.roomName ? 'Chambre ' + patient.roomName : 'Soin externe' }}</p>
            </div>
          </div>

          <div class="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <div class="flex items-center gap-3 mb-10">
              <div class="h-8 w-2 bg-[#1E8E6E] rounded-full"></div>
              <h3 class="text-2xl font-black text-slate-800 tracking-tight">Anamnèse & Observations</h3>
            </div>

            <div class="space-y-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Motif de consultation</label>
                  <p class="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 italic">
                    "{{ patient.consultationReason || 'Aucun motif renseigné.' }}"
                  </p>
                </div>
                <div class="space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Traitements en cours</label>
                  <p class="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    {{ patient.currentTreatments || 'Aucun traitement signalé.' }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Historique & Antécédents</label>
                <p class="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                  {{ patient.personalHistory || 'Aucun antécédent particulier déclaré.' }}
                </p>
              </div>

              <div class="p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-10">
                  <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>
                </div>
                <label class="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 block">Diagnostic Médical Établi</label>
                <p class="text-2xl font-black text-emerald-900 leading-tight relative z-10">
                  {{ patient.diagnosis || 'En attente de diagnostic final...' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-xl mx-auto mt-32 text-center">
      <div class="text-8xl mb-6">🔍</div>
      <h2 class="text-3xl font-black text-slate-800 tracking-tight italic">Dossier inexistant</h2>
      <p class="text-slate-500 mt-4 mb-10 font-medium text-lg">Le numéro d'identification ne correspond à aucun patient actif.</p>
      <button @click="$router.push({ name: 'Patients' })" class="bg-[#1E8E6E] text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-[#166f56] transition-all transform active:scale-95">
        Retour à l'annuaire
      </button>
    </div>
  </div>
</template>