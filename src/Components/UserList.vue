<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['users']);
const emit = defineEmits(['edit-user', 'delete-user']);

// États pour les filtres
const searchQuery = ref('');
const statusFilter = ref('all');

// Logique de filtrage
const filteredUsers = computed(() => {
  return props.users.filter(u => {
    const name = (u.Name || u.name || '').toLowerCase();
    const matchesSearch = name.includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === 'all' || u.role === statusFilter.value;
    
    return matchesSearch && matchesStatus;
  });
});

const getInitials = (name) => {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
      <div class="relative w-full md:w-96">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Rechercher un membre..." 
          class="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#1E8E6E]/20 outline-none transition-all"
        >
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 hidden md:block">Filtrer par :</label>
        <select 
          v-model="statusFilter"
          class="w-full md:w-48 p-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-[#1E8E6E]/20 outline-none cursor-pointer"
        >
          <option value="all">Tous les rôles</option>
          <option value="doctor">Médecins</option>
          <option value="Receptionniste">Réceptionnistes</option>
          <option value="Admin">Administrateurs</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all">
      <table class="w-full text-left border-separate border-spacing-0">
        <thead class="bg-gray-50/50">
          <tr>
            <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Membre du personnel</th>
            <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Rôle & Accès</th>
            <th class="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Gestion</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="u in filteredUsers" :key="u.id" class="group hover:bg-emerald-50/30 transition-all duration-300">
            <td class="px-6 py-5">
              <div class="flex items-center gap-4">
                <div :class="[
                  'h-11 w-11 rounded-xl flex items-center justify-center font-black text-xs shadow-sm ring-2 ring-white',
                  u.role === 'doctor' || u.role === 'Admin' ? 'bg-[#1E8E6E] text-white' : 'bg-emerald-100 text-[#1E8E6E]'
                ]">
                  {{ getInitials(u.Name || u.name) }}
                </div>
                <div>
                  <div class="font-black text-gray-800 text-sm group-hover:text-[#1E8E6E] transition-colors">
                    {{ u.Name || u.name }}
                  </div>
                  <div class="text-xs text-gray-400 font-medium">{{ u.email }}</div>
                </div>
              </div>
            </td>

            <td class="px-6 py-5 text-center">
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                :class="u.role === 'doctor' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 
                        u.role === 'Admin' ? 'bg-red-50 text-red-600 ring-1 ring-red-100' : 
                        'bg-purple-50 text-purple-600 ring-1 ring-purple-100'"
              >
                {{ u.role }}
              </span>
            </td>

            <td class="px-6 py-5 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="emit('edit-user', u)" class="p-2.5 bg-white border border-gray-100 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button v-if="u.role !== 'Admin'" @click="emit('delete-user', u.id)" class="p-2.5 bg-white border border-gray-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td colspan="3" class="p-20 text-center">
              <div class="flex flex-col items-center justify-center opacity-30">
                <svg class="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p class="font-bold text-sm uppercase tracking-widest">Aucun résultat pour cette recherche</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>