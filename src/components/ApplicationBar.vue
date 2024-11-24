<template>
  <v-app-bar>
    <v-app-bar-title>{{ user?.username }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn v-if="user" variant="text" @click="handleLogout">ログアウト</v-btn>
      <v-btn v-else variant="text" @click="handleLogin">ログイン</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import type { User } from '@/types/api'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const router = useRouter()

const user = ref<User | null>(null)

const handleLogout = () => {
  sessionStore.logout()
  router.go(0)
}

const handleLogin = () => {
  router.push('/login')
}

onMounted(async () => {
  user.value = await sessionStore.getLoginUser()
})
</script>
