<script setup lang="ts">
import { RouterView } from 'vue-router'
import Base from '@/layout/Base.vue'
import Header from '@/views/header.vue'
import Menu from '@/views/menu.vue'
import Footer from '@/views/footer.vue'
</script>

<template>
  <Base>
    <template #content>
      <RouterView />
    </template>
    <template #header>
      <Header></Header>
    </template>
    <template #sider>
      <Menu></Menu>
    </template>
    <template #footer>
      <Footer></Footer>
    </template>
  </Base>
  <RouterView />
</template>

<style scoped></style>
