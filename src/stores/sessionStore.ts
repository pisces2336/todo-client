import type { User } from '@/types/api'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { useAxiosStore } from './axiosStore'

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    /**
     * ログインを行う
     */
    async login(username: string, password: string) {
      const axiosStore = useAxiosStore()
      const { cookies } = useCookies()

      const url = '/api/auth/jwt/create'
      const data = { username, password }
      const res = await axiosStore.post(url, data)
      if (!res) {
        console.error('アクセストークンの取得に失敗しました')
        return false
      }
      cookies.set('accessToken', res.data.access)

      // ログインユーザー情報の更新
      await this.getLoginUser()

      return true
    },

    /**
     * ログアウトを行う（アクセストークンとユーザー情報を捨てる）
     */
    logout() {
      const { cookies } = useCookies()

      cookies.remove('accessToken')
      this.$state.user = null
    },

    /**
     * アクセストークンの検証を行う
     */
    async isAuthenticated() {
      const axiosStore = useAxiosStore()
      const { cookies } = useCookies()

      const url = '/api/auth/jwt/verify'
      const data = { token: cookies.get('accessToken') }
      const res = await axiosStore.post(url, data)
      if (!res) {
        console.error('アクセストークンの検証に失敗しました')
        return false
      }

      // ログインユーザー情報の更新
      await this.getLoginUser()

      return true
    },

    /**
     * ログインユーザーの取得を行う
     */
    async getLoginUser() {
      const axiosStore = useAxiosStore()

      const url = '/api/auth/users/me'
      const res = await axiosStore.get(url)
      if (!res) {
        console.error('ログインユーザーの取得に失敗しました')
        return null
      }

      this.$state.user = res.data
      return true
    },
  },
})
