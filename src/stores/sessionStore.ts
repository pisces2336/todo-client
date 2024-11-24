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
     * アクセストークンの取得とログインユーザーの取得を行う
     */
    async login(username: string, password: string) {
      return (await this._fetchAccessToken(username, password)) && (await this._fetchLoginUser())
    },

    /**
     * アクセストークンの検証とログインユーザーの取得を行う
     */
    async isAuthenticated() {
      return (await this._verifyAccessToken()) && (await this._fetchLoginUser())
    },

    /**
     * アクセストークンを取得する
     */
    async _fetchAccessToken(username: string, password: string) {
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
      return true
    },

    /**
     * アクセストークンを検証する
     */
    async _verifyAccessToken() {
      const axiosStore = useAxiosStore()
      const { cookies } = useCookies()

      const url = '/api/auth/jwt/verify'
      const data = { token: cookies.get('accessToken') }
      const res = axiosStore.post(url, data)
      if (!res) {
        console.error('アクセストークンの検証に失敗しました')
        return false
      }
      return true
    },

    /**
     * ログインユーザーを取得する
     */
    async _fetchLoginUser() {
      const axiosStore = useAxiosStore()

      const url = '/api/auth/users/me'
      const res = await axiosStore.get(url)
      if (!res) {
        console.error('ログインユーザーの取得に失敗しました')
        return false
      }
      this.$state.user = res.data
      return true
    },
  },
})
