<template>
  <v-container>
    <v-row>
      <v-col>
        <SignupForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SignupForm from '@/components/SignupForm.vue'
import { useSessionStore } from '@/stores/sessionStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const router = useRouter()

onMounted(async () => {
  if (await sessionStore.isAuthenticated()) {
    router.push('/')
  }
})
</script>
