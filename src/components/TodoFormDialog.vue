<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="primary" text="新規作成" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Todo作成">
        <v-card-text>
          <v-form
            v-model="formValid"
            @submit.prevent="
              async () => {
                if (await submit()) {
                  isActive.value = false
                }
              }
            "
          >
            <v-text-field label="タイトル" v-model="title" :rules="[nonEmptyRule]"></v-text-field>
            <v-textarea label="説明" v-model="description"></v-textarea>
            <v-date-input label="締切日" v-model="due" :rules="[nonEmptyRule]"></v-date-input>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="elevated"
                text="キャンセル"
                @click="isActive.value = false"
              ></v-btn>
              <v-btn color="success" variant="elevated" text="作成" type="submit"></v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAxiosStore } from '@/stores/axiosStore'
import { useMypageStore } from '@/stores/mypageStore'
import { useSessionStore } from '@/stores/sessionStore'
import { ref } from 'vue'

const sessionStore = useSessionStore()
const axiosStore = useAxiosStore()
const mypageStore = useMypageStore()

const formValid = ref(false)
const title = ref('')
const description = ref('')
const due = ref<Date>()

const nonEmptyRule = (r: string) => !!r || '必須項目です'

const clearFormInput = () => {
  title.value = ''
  description.value = ''
  due.value = undefined
}

// isActiveをtemplate側で操作するため、結果をbooleanで返す
const submit = async () => {
  if (!formValid.value) {
    return false
  }

  const url = '/api/todos/'
  const data = {
    user_id: sessionStore.user?.id,
    title: title.value,
    description: description.value,
    due: due.value,
  }

  const res = await axiosStore.post(url, data)
  if (!res) {
    return false
  }

  mypageStore.unshift(res.data)
  clearFormInput()
  return true
}
</script>
