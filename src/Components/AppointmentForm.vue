<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  appointment: Object,
  patients: Array,
  doctors: Array
});

const emit = defineEmits(["save"]);

const form = reactive({
  id: null,
  patientId: "",
  doctorId: "",
  date: "",
  time: "",
  status: "programmé"
});

// Mettre à jour le formulaire quand props.appointment change
watch(
  () => props.appointment,
  (newVal) => {
    if (newVal) {
      Object.assign(form, newVal);
    }
  },
  { immediate: true }
);

function submit() {
  if (!form.patientId || !form.doctorId || !form.date || !form.time) {
    alert("Veuillez remplir tous les champs !");
    return;
  }
  emit("save", { ...form }); // On renvoie l'objet complet avec ID
}


</script>

<template>
  <div class="space-y-6 font-sans">
    <div class="space-y-2">
      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
        Patient concerné
      </label>
      <div class="relative group">
        <select 
          v-model="form.patientId" 
          class="w-full pl-4 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#1E8E6E] focus:ring-4 focus:ring-[#1E8E6E]/5 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
          required
        >
          <option value="">Sélectionner un patient</option>
          <option v-for="p in patients" :key="p.id" :value="p.id">
            {{ p.firstName }} {{ p.lastName }}
          </option>
        </select>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#1E8E6E]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
        Médecin traitant
      </label>
      <div class="relative group">
        <select 
          v-model="form.doctorId" 
          class="w-full pl-4 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#1E8E6E] focus:ring-4 focus:ring-[#1E8E6E]/5 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
          required
        >
          <option value="">Sélectionner un médecin</option>
          <option v-for="d in doctors" :key="d.id" :value="d.id">
            Dr. {{ d.name }} — {{ d.speciality }}
          </option>
        </select>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#1E8E6E]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Date</label>
        <input 
          type="date" 
          v-model="form.date" 
          class="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#1E8E6E] focus:ring-4 focus:ring-[#1E8E6E]/5 transition-all font-bold text-slate-700"
          required 
        />
      </div>
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Heure</label>
        <input 
          type="time" 
          v-model="form.time" 
          class="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#1E8E6E] focus:ring-4 focus:ring-[#1E8E6E]/5 transition-all font-bold text-slate-700"
          required 
        />
      </div>
    </div>

    <div class="space-y-2">
      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Statut du RDV</label>
      <div class="flex gap-2">
        <button 
          v-for="status in ['programmé', 'terminé', 'annulé']" 
          :key="status"
          @click="form.status = status"
          type="button"
          :class="[
            'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border',
            form.status === status 
              ? 'bg-[#1E8E6E] text-white border-[#1E8E6E] shadow-lg shadow-[#1E8E6E]/20' 
              : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
          ]"
        >
          {{ status }}
        </button>
      </div>
    </div>

    <div class="pt-4">
      <button 
        @click="submit"
        class="w-full py-5 bg-[#1E8E6E] text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-[#1E8E6E]/30 hover:bg-[#166f56] transition-all transform active:scale-[0.98]"
      >
        {{ form.id ? 'Mettre à jour le dossier' : 'Confirmer le rendez-vous' }}
      </button>
    </div>
  </div>
</template>