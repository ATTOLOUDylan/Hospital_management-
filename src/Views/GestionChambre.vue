<script setup>
import { ref, onMounted } from 'vue'

const chambres = ref([])

onMounted(() => {
  const savedRooms = JSON.parse(localStorage.getItem('rooms') || '[]')

  if (savedRooms.length === 0) {
    const rooms = [
      { id: 1, numero: "A-01", status: 'libre', type: "Standard", capacite: 10 },
      { id: 2, numero: "A-02", status: 'libre', type: "Standard", capacite: 15 },
      { id: 3, numero: "A-03", status: 'occupée', type: "VIP", capacite: 5 },
      { id: 4, numero: "A-04", status: 'libre', type: "Soins Intensifs", capacite: 10 },
      { id: 5, numero: "A-05", status: 'occupée', type: "Pédiatrie", capacite: 5 },
      { id: 6, numero: "A-06", status: 'libre', type: "Standard", capacite: 12 },
      { id: 7, numero: "A-07", status: 'libre', type: "Standard", capacite: 10 },
      { id: 8, numero: "A-08", status: 'libre', type: "Standard", capacite: 15 },
      { id: 9, numero: "A-09", status: 'occupée', type: "VIP", capacite: 5 },
      { id: 10, numero: "A-10", status: 'libre', type: "Soins Intensifs", capacite: 10 },
      { id: 11, numero: "A-11", status: 'occupée', type: "Pédiatrie", capacite: 5 },
      { id: 12, numero: "A-12", status: 'libre', type: "Standard", capacite: 12 }
    ]
    localStorage.setItem('rooms', JSON.stringify(rooms))
    chambres.value = rooms
  } else {
    chambres.value = savedRooms
  }
})
</script>

<template>
  <div class="hospital-container">
    <header>
      <h1> Liste des Chambres</h1>
      
    </header>

    <div class="grid-container">
      <div v-for="chambre in chambres" :key="chambre.id" class="chambre-card">
        <div class="details">
          <h2>Chambre {{ chambre.numero }}</h2>
          <p class="type">{{ chambre.type }}</p>
          <div class="capacite-tag">
            Capacité : <strong>{{ chambre.capacite }} lit(s)</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.hospital-container {
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 { color: #2c3e50; margin-bottom: 5px; }

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.chambre-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.chambre-card:hover {
  transform: translateY(-5px);
  border-color: #3498db;
}

.icon {
  font-size: 2.5rem;
  margin-right: 20px;
}

.details h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #34495e;
}

.type {
  margin: 5px 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.capacite-tag {
  display: inline-block;
  background: #ebf5fb;
  color: #2980b9;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-top: 5px;
}
</style>