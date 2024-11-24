<template>
  <v-layout>
    <ApplicationBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ApplicationBar from './components/ApplicationBar.vue'
</script>
