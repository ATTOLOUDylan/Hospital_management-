<script setup>
import Navbar from './Layout/Navbar.vue';
import Sidebar from './Layout/Sidebar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
<div>
<div><Navbar/></div>
<div class="layout">
    <Sidebar/>
  <div class=" content ">
    <RouterView/>
  </div>
</div>
</div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;              /* prend tout l’espace restant */
  background: #f8f9fa;
  padding: 24px;

}
</style>
