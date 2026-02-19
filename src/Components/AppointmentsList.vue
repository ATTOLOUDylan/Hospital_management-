<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  appointments: Array,
  patients: Array,
  doctors: Array,
  canEdit: Boolean
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

// Petit helper pour les couleurs de statut
const getStatusStyles = (status) => {
  const s = status?.toLowerCase();
  if (s === 'confirmé' || s === 'termine') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (s === 'en attente' || s === 'pending') return 'bg-amber-50 text-amber-600 border-amber-100';
  if (s === 'annulé') return 'bg-rose-50 text-rose-600 border-rose-100';
  return 'bg-slate-50 text-slate-600 border-slate-100';
};
</script>

<template>
  <div class="w-full bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50 border-b border-slate-100">
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Médecin</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date & Heure</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
            <th v-if="canEdit" class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="a in appointments" :key="a.id" class="group hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-5">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#1E8E6E]/10 text-[#1E8E6E] flex items-center justify-center text-xs font-black">
                  {{ getPatientName(a.patientId).charAt(0) }}
                </div>
                <span class="font-bold text-slate-700">{{ getPatientName(a.patientId) }}</span>
              </div>
            </td>

            <td class="px-6 py-5">
              <span class="text-slate-600 font-medium">Dr. {{ getDoctorName(a.doctorId) }}</span>
            </td>

            <td class="px-6 py-5">
              <div class="flex flex-col">
                <span class="text-slate-700 font-bold text-sm">{{ a.date }}</span>
                <span class="text-slate-400 text-xs font-medium">{{ a.time }}</span>
              </div>
            </td>

            <td class="px-6 py-5">
              <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border', getStatusStyles(a.status)]">
                {{ a.status }}
              </span>
            </td>

            <td v-if="canEdit" class="px-6 py-5 text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click="$emit('edit', a)"
                  class="p-2 text-[#1E8E6E] hover:bg-[#1E8E6E]/10 rounded-xl transition-all"
                  title="Modifier"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="$emit('delete', a.id)"
                  class="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"
                  title="Supprimer"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="appointments.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-slate-400 font-medium italic">
              Aucun rendez-vous programmé.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>