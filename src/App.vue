<script setup>
import Navbar from "./Layout/Navbar.vue";
import Sidebar from "./Layout/Sidebar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <div>
      <Navbar />
    </div>
    <div id="vue">
      <Sidebar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#vue {
  display: flex;
}
</style>
