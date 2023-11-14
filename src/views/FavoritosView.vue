<template>
  <div class="container">
    <h1>favoritos</h1>
  </div>
</template>

<script setup>
  import { useDataStore } from '@/stores/favoritos';
  const dataStore = useDataStore();
  console.log(dataStore);
</script>