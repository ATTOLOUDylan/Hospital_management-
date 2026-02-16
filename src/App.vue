<script setup>
import Navbar from './Layout/Navbar.vue';
import Sidebar from './Layout/Sidebar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
<div>
  <div><Navbar/></div>
  <div><Sidebar/></div>
  <div>
    <RouterView/>
  </div>
</div>
</template>

<style scoped></style>
