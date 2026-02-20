<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);

// 1. Fonction réutilisable pour récupérer l'user
const loadUser = () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    console.log("User chargé :", user.value.Name);
  }
};

// 2. Charger dès que le composant est créé (immédiat pour éviter le bug d'affichage après login)
loadUser();

// 3. Charger au montage
onMounted(() => {
  loadUser();
});

// 4. Surveiller les changements de route
watch(
  () => route.path,
  () => {
    loadUser();
  },
);
</script>

<template>
  <aside
    class="fixed left-0 top-0 h-screen w-72 bg-gray-50 border-r border-gray-200 z-40 flex flex-col transition-all duration-300"
    v-if="!$route.meta.hideNav && user"
  >
    <div class="p-8 mb-4">
      <div class="flex items-center gap-3 group cursor-pointer">
        <div
          class="w-10 h-10 bg-[#1E8E6E] rounded-xl flex items-center justify-center shadow-lg shadow-[#1E8E6E]/30 group-hover:rotate-6 transition-transform"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-800 tracking-tight">
          Harmony<span class="text-[#1E8E6E]">Hub</span>
        </h1>
      </div>
    </div>

    <nav class="flex-1 px-4 space-y-4 overflow-y-auto custom-scrollbar">
      <RouterLink :to="{ name: 'Home' }" v-slot="{ isActive }">
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10"
              />
            </svg>
          </div>
          <span>Tableau de bord</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'Admin'"
        :to="{ name: 'Doctors' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span>Gestion des médecins</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'Admin' || user.role == 'Receptionniste'"
        :to="{ name: 'Patients' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span>Gestion des patients</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'doctor'"
        :to="{ name: 'Patients' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span>Mes patients</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'Admin' || user.role == 'Receptionniste'"
        :to="{ name: 'Appointments' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span>Rendez-vous</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'doctor'"
        :to="{ name: 'Appointments' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span>Mes Rendez-vous</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'Admin' || user.role == 'Receptionniste'"
        :to="{ name: 'Rooms' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span>Gestion des chambres</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'Admin'"
        :to="{ name: 'Plainte' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span>Gestion des plaintes</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'doctor' || user.role == 'Receptionniste'"
        :to="{ name: 'Plainte' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span>Déposer une plainte</span>
        </div>
      </RouterLink>

      <RouterLink
        v-if="user.role == 'Admin'"
        :to="{ name: 'Users' }"
        v-slot="{ isActive }"
      >
        <div
          :class="[
            'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
            isActive
              ? 'bg-white shadow-md text-[#1E8E6E] font-bold'
              : 'text-gray-500 hover:text-[#1E8E6E] hover:bg-[#1E8E6E]/5 hover:translate-x-1',
          ]"
        >
          <div
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isActive
                ? 'bg-[#1E8E6E] text-white shadow-md'
                : 'bg-gray-100 text-gray-400 group-hover:bg-[#1E8E6E]/10 group-hover:text-[#1E8E6E]',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span>Gestion utilisateurs</span>
        </div>
      </RouterLink>
    </nav>

    <div class="p-4 border-t border-gray-100 bg-white">
      <div
        class="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100"
      >
        <div
          class="w-8 h-8 rounded-full bg-[#1E8E6E] flex items-center justify-center text-white text-xs font-bold shrink-0"
        >
          {{ user.Name.charAt(0) }}
        </div>
        <div class="flex flex-col min-w-0">
          <span
            class="text-xs font-bold text-gray-700 truncate uppercase tracking-tight"
            >{{ user.Name }}</span
          >
          <span
            class="text-[10px] text-[#1E8E6E] font-bold uppercase tracking-widest"
            >{{ user.role }}</span
          >
        </div>
      </div>
    </div>
  </aside>
</template>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0px;
}
</style>
