<template>
  <v-card>
    <v-card-text>
      <v-data-table :items="mypageStore.todos" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <v-btn size="small" text="削除" color="error" @click="deleteItem(item)" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAxiosStore } from '@/stores/axiosStore'
import { useMypageStore } from '@/stores/mypageStore'
import type { Todo } from '@/types/api'
import { onMounted } from 'vue'

const axiosStore = useAxiosStore()
const mypageStore = useMypageStore()

const headers = [
  {
    title: 'タイトル',
    key: 'title',
  },
  {
    title: '説明',
    key: 'description',
    sortable: false,
  },
  {
    title: '締切日',
    key: 'due',
    value: (item: Todo) => new Date(item.due).toLocaleDateString('ja'),
  },
  {
    title: '',
    key: 'actions',
    sortable: false,
  },
]

const deleteItem = async (item: Todo) => {
  const url = `/api/todos/${item.id}/`
  const res = await axiosStore.delete(url)
  if (!res) {
    console.error('削除に失敗しました')
    return
  }

  mypageStore.remove(item)
}

onMounted(async () => {
  const url = '/api/todos/'
  const res = await axiosStore.get(url)
  if (!res) {
    return
  }
  mypageStore.todos = res.data
})
</script>
