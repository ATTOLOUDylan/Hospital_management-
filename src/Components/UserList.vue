<script setup>
defineProps(['users']);
const emit = defineEmits(['edit-user', 'delete-user']);
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead class="bg-gray-50 text-gray-600 text-sm uppercase">
        <tr>
          <th class="p-4">Utilisateur</th>
          <th class="p-4">Rôle</th>
          <th class="p-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50/50 transition-colors">
          <td class="p-4">
            <div class="font-bold text-gray-800">{{ u.name }}</div>
            <div class="text-xs text-gray-500">{{ u.email }}</div>
          </td>
          <td class="p-4">
            <span class="px-2 py-1 rounded text-xs" :class="u.role === 'Médecin' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'">
              {{ u.role }}
            </span>
          </td>
          <td class="p-4 text-right">
            <button @click="emit('edit-user', u)" class="text-blue-500 hover:underline mr-3">Modifier</button>
            <button @click="emit('delete-user', u.id)" class="text-red-500 hover:underline">Supprimer</button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="3" class="p-8 text-center text-gray-400 italic">Aucun utilisateur trouvé.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>