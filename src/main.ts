import 'modern-css-reset'
import 'vuetify/styles'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VDateInput } from 'vuetify/labs/VDateInput'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(
  createVuetify({
    components: { ...components, VDateInput },
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
  }),
)
app.use(router)

app.mount('#app')
