<template>
  <v-card title="ユーザー登録">
    <v-card-text>
      <v-form v-model="formValid" @submit.prevent="submit">
        <v-text-field label="ユーザー名" v-model="username" :rules="[nonEmptyRule]" />
        <v-text-field label="メールアドレス" v-model="email" :rules="[nonEmptyRule, emailRule]" />
        <v-text-field
          label="パスワード"
          v-model="password"
          :rules="[nonEmptyRule]"
          type="password"
        />
        <v-btn type="submit">ログイン</v-btn>
      </v-form>
      <v-btn variant="text" to="/login">アカウントをお持ちの方はこちら</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAxiosStore } from '@/stores/axiosStore'
import { useSessionStore } from '@/stores/sessionStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const axiosStore = useAxiosStore()
const sessionStore = useSessionStore()
const router = useRouter()

const formValid = ref(false)
const username = ref('')
const email = ref('')
const password = ref('')

const nonEmptyRule = (v: string) => !!v || '必須項目です'
const emailRule = (v: string) => {
  const regex = /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i
  return regex.test(v) || '不正な形式です'
}

const submit = async () => {
  if (!formValid.value) {
    return
  }

  const url = '/api/users/'
  const data = {
    id: null,
    username: username.value,
    email: email.value,
    password: password.value,
  }

  const res = await axiosStore.post(url, data)
  if (!res) {
    return
  }

  const loginResult = await sessionStore.login(username.value, password.value)
  if (loginResult) {
    router.push('/')
  }
}
</script>
