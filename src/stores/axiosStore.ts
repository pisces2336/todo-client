import axios from 'axios'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'

export const useAxiosStore = defineStore('axios', {
  actions: {
    async get(url: string) {
      const { cookies } = useCookies()

      const accessToken = cookies.get('accessToken')
      const config = { headers: { Authorization: `JWT ${accessToken}` } }
      try {
        const res = await axios.get(url, config)
        return res
      } catch {
        return null
      }
    },
    async post(url: string, data: object) {
      const { cookies } = useCookies()

      const accessToken = cookies.get('accessToken')
      const config = { headers: { Authorization: `JWT ${accessToken}` } }
      try {
        const res = await axios.post(url, data, config)
        return res
      } catch {
        return null
      }
    },
  },
})
