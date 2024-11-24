<template>
  <v-card title="ログイン">
    <v-card-text>
      <v-form v-model="formValid" @submit.prevent="submit">
        <v-text-field label="ユーザー名" v-model="username" :rules="usernameRules" />
        <v-text-field
          label="パスワード"
          v-model="password"
          :rules="passwordRules"
          type="password"
        />
        <v-btn type="submit">ログイン</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const router = useRouter()

const formValid = ref(false)
const username = ref('')
const password = ref('')

const usernameRules = [
  (v: string) => {
    if (!v) {
      return 'ユーザー名を入力してください'
    }
    return true
  },
]
const passwordRules = [
  (v: string) => {
    if (!v) {
      return 'パスワードを入力してください'
    }
    return true
  },
]

const submit = async () => {
  if (!formValid.value) {
    return
  }

  const loginResult = await sessionStore.login(username.value, password.value)
  if (loginResult) {
    router.push('/')
  }
}
</script>
