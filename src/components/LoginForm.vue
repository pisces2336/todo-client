<template>
  <v-card title="ログイン">
    <v-card-text>
      <v-form v-model="formValid" @submit.prevent="submit">
        <v-text-field label="ユーザー名" v-model="username" :rules="[nonEmptyRule]" />
        <v-text-field
          label="パスワード"
          v-model="password"
          :rules="[nonEmptyRule]"
          type="password"
        />
        <v-btn type="submit">ログイン</v-btn>
      </v-form>
      <v-btn variant="text" to="/signup">アカウントをお持ちでない方はこちら</v-btn>
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

const nonEmptyRule = (v: string) => !!v || '必須項目です'

const submit = async () => {
  if (!formValid.value) {
    return
  }

  const loginResult = await sessionStore.login(username.value, password.value)
  if (loginResult) {
    router.push('/mypage')
  }
}
</script>
