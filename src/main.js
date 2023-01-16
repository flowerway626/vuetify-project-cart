/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import '@/styles/main.sass'

// function 簡寫，可以立刻執行不用再呼叫
(async () => {
  const app = createApp(App)

  await registerPlugins(app)

  app.mount('#app')
})()
