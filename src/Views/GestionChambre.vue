<script setup>
import { ref, onMounted } from 'vue'

const chambres = ref([])

onMounted(() => {
  const savedRooms = JSON.parse(localStorage.getItem('rooms') || '[]')

  if (savedRooms.length === 0) {
    const rooms = [
      { id: 1, numero: "A-01", status: 'libre', type: "Standard", capacite: 10, AffectationPatient: 0 },
      { id: 2, numero: "A-02", status: 'libre', type: "Standard", capacite: 15, AffectationPatient: 0 },
      { id: 3, numero: "A-03", status: 'occupée', type: "VIP", capacite: 5, AffectationPatient: 0 },
      { id: 4, numero: "A-04", status: 'libre', type: "Soins Intensifs", capacite: 10, AffectationPatient: 0 },
      { id: 5, numero: "A-05", status: 'occupée', type: "Pédiatrie", capacite: 5, AffectationPatient: 0 },
      { id: 6, numero: "A-06", status: 'libre', type: "Standard", capacite: 12, AffectationPatient: 0 },
      { id: 7, numero: "A-07", status: 'libre', type: "Standard", capacite: 10, AffectationPatient: 0 },
      { id: 8, numero: "A-08", status: 'libre', type: "Standard", capacite: 15, AffectationPatient: 0 },
      { id: 9, numero: "A-09", status: 'occupée', type: "VIP", capacite: 5, AffectationPatient: 0 },
      { id: 10, numero: "A-10", status: 'libre', type: "Soins Intensifs", capacite: 10, AffectationPatient: 0 },
      { id: 11, numero: "A-11", status: 'occupée', type: "Pédiatrie", capacite: 5, AffectationPatient: 0 },
      { id: 12, numero: "A-12", status: 'libre', type: "Standard", capacite: 12, AffectationPatient: 0 }
    ]
    localStorage.setItem('rooms', JSON.stringify(rooms))
    chambres.value = rooms
  } else {
    chambres.value = savedRooms
  }
})

// Fonction pour attribuer une couleur selon le type
const getTypeClass = (type) => {
  switch (type) {
    case 'VIP': return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'Soins Intensifs': return 'bg-red-100 text-red-700 border-red-200'
    case 'Pédiatrie': return 'bg-pink-100 text-pink-700 border-pink-200'
    default: return 'bg-blue-100 text-blue-700 border-blue-200'
  }
}
</script>

<template>
  <div class="w-full px-4 sm:px-8 lg:px-12 py-4">
    
    <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
      <div class="space-y-1">
        <h1 class="text-4xl font-black text-gray-800 tracking-tighter">
          Gestion des <span class="text-[#1E8E6E]">Chambres</span>
        </h1>
        <p class="text-gray-400 font-medium">Aperçu global et disponibilité des unités de soin.</p>
      </div>
      
      <div class="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-gray-100 w-fit">
        <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none">Capacité Totale</p>
          <p class="text-lg font-bold text-gray-700 leading-tight">{{ chambres.length }} Unités</p>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      <div 
        v-for="chambre in chambres" 
        :key="chambre.id" 
        class="group bg-white rounded-[2rem] p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#1E8E6E]/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
      >
        <div class="absolute -right-2 -bottom-2 text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
           <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        </div>

        <div class="relative z-10 h-full flex flex-col">
          <div class="flex justify-between items-start mb-6">
            <span class="px-4 py-1.5 bg-[#1E8E6E] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-[#1E8E6E]/20">
              Unit {{ chambre.numero }}
            </span>
            <div :class="[
              'w-3 h-3 rounded-full border-2 border-white ring-2 transition-all duration-500', 
              chambre.status === 'libre' ? 'bg-green-500 ring-green-100 group-hover:scale-125' : 'bg-red-500 ring-red-100'
            ]"></div>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Chambre {{ chambre.numero }}</h2>
            <span :class="['text-[11px] font-bold px-3 py-1.5 rounded-xl border-2 uppercase tracking-wider transition-colors duration-300', getTypeClass(chambre.type)]">
              {{ chambre.type }}
            </span>
          </div>

          <div class="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p class="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Espace</p>
              <p class="text-gray-700 font-bold text-lg leading-none">{{ chambre.capacite }} <span class="text-sm font-medium text-gray-500">Lits</span></p>
            </div>
            
            <button class="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1E8E6E] hover:bg-[#1E8E6E] hover:text-white hover:rotate-90 transition-all duration-500 border border-gray-100 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>