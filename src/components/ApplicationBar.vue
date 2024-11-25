<template>
  <v-app-bar>
    <v-app-bar-title>{{ sessionStore.user?.username }}</v-app-bar-title>
    <template v-slot:append>
      <template v-if="sessionStore.user">
        <v-btn variant="text" @click="handleLogout">ログアウト</v-btn>
      </template>
      <template v-else>
        <v-btn variant="text" @click="handleSignup">ユーザー登録</v-btn>
        <v-btn variant="text" @click="handleLogin">ログイン</v-btn>
      </template>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const router = useRouter()

const handleLogout = () => {
  sessionStore.logout()
  router.push('/login')
}

const handleSignup = () => {
  router.push('/signup')
}

const handleLogin = () => {
  router.push('/login')
}

onMounted(async () => {
  await sessionStore.getLoginUser()
})
</script>
