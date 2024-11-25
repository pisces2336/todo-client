import type { Todo } from '@/types/api'
import { defineStore } from 'pinia'

export const useMypageStore = defineStore('mypage', {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    unshift(item: Todo) {
      this.todos.unshift(item)
    },
    remove(item: Todo) {
      this.todos = this.todos.filter((v) => {
        return v.id !== item.id
      })
    },
  },
})
