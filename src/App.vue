<template lang="pug">
v-app(:theme="theme")
  v-btn(:icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="themeChange")
  router-view
</template>

<script setup>
import { ref } from 'vue'
const theme = ref('dark')

function themeChange () {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

</script>
