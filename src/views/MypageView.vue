<script setup lang="ts">
import TodoFormDialog from '@/components/TodoFormDialog.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <TodoFormDialog />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TodoList />
      </v-col>
    </v-row>
  </v-container>
</template>
