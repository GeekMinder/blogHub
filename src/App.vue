<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from '@/components/layout/index.vue'
import Header from '@/views/header.vue'
import Menu from '@/views/menu.vue'
import Footer from '@/views/footer.vue'
</script>

<template>
  <BaseLayout>
    <template #content>
      <RouterView />
    </template>
    <template #header>
      <Header />
    </template>
    <template #sider>
      <Menu />
    </template>
    <template #footer>
      <Footer />
    </template>
  </BaseLayout>
</template>

<style scoped></style>
