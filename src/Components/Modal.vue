<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <slot></slot>
      <button class="close-btn" @click="close">X</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  position: relative;
}
.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: #e76f51;
  border: none;
  color: white;
  border-radius: 50%;
  width: 28px; height: 28px;
  cursor: pointer;
}
</style>
