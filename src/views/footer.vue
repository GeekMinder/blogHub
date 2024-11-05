<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import logo from '@/assets/logo.svg'
import arco from '@/assets/arco.svg'
import { storeToRefs } from 'pinia';
const year = new Date().getFullYear()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <div class="footer-container">
    <a-typography-text type="secondary">BlogHub ©{{ year }} powered by Vue3
      <a-image :src="logo" width="17" />
      and Arco
      Design
      <a-image :src="arco" width="20" />
    </a-typography-text>

  </div>
</template>

<style scoped lang="less">
.footer-container {
  .flex-center();
}
</style>
