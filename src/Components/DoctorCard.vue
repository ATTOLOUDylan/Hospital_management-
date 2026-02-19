<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";

// 1. Importation du composant
import Modal from "@/Components/Modal.vue";
import { defineProps, defineEmits } from "vue";

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

// On envoie l'objet docteur complet pour que le modal de confirmation 
// puisse afficher son nom (ex: "Voulez-vous supprimer le Dr. Smith ?")
function handleDelete() {
  emit("delete", props.doctor);
}
</script>

<template>
  <div 
    class="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#1E8E6E]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4"
  >
    <div class="flex items-center gap-6">
      <div class="hidden sm:flex w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center text-slate-400 font-black text-xl border border-slate-100 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E] transition-colors">
        {{ doctor.name.split(' ').map(n => n[0]).join('').toUpperCase().darken }}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <div class="space-y-1">
        <div class="flex items-center gap-3 flex-wrap">
          <h3 class="text-xl font-black text-slate-800 tracking-tight group-hover:text-[#1E8E6E] transition-colors">
            Dr. {{ doctor.name }}
          </h3>
          <span 
            :class="[
              'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
              doctor.available 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-rose-50 text-rose-600 border-rose-100'
            ]"
          >
            {{ doctor.available ? "Disponible" : "Indisponible" }}
          </span>
        </div>
        
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
          <p class="text-[#1E8E6E] flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            {{ doctor.speciality }}
          </p>
          <p class="text-slate-400 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {{ doctor.phone }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button 
        @click="handleEdit"
        class="flex-1 md:flex-none px-6 py-3 bg-[#1E8E6E]/10 text-[#1E8E6E] rounded-xl font-black text-sm hover:bg-[#1E8E6E] hover:text-white transition-all transform active:scale-95"
      >
        Modifier
      </button>
      
      <button 
        @click="handleDelete" 
        class="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all group/delete"
        title="Supprimer le médecin"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>