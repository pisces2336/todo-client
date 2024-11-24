import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { useAxiosStore } from './axiosStore'

export const useSessionStore = defineStore('session', {
  actions: {
    async login(username: string, password: string) {
      const axiosStore = useAxiosStore()
      const { cookies } = useCookies()

      const url = '/api/auth/jwt/create'
      const data = { username, password }
      const res = await axiosStore.post(url, data)
      if (!res) {
        alert('ログインに失敗しました')
        return false
      }

      cookies.set('accessToken', res.data.access)
      alert('ログインに成功しました')
      return true
    },
  },
})
