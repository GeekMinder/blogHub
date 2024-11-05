<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
const router = useRouter()

const menus = computed(() => router.getRoutes().filter((route) => route.meta?.showInMenu))

const selectedKeys = ref<string[]>([])
function handleMenuClick(path: string) {
  router.push(path)
}

// 监听路由变化，更新选中状态
watchEffect(() => {
  selectedKeys.value = [router.currentRoute.value.path]
})

</script>

<template>
  <div class="menu-container">
    <a-menu :selected-keys="selectedKeys">
      <a-menu-item v-for="menu in menus" :key="menu.path" @click="handleMenuClick(menu.path)">
        <template #icon>
          <component :is="menu.meta.icon" />
        </template>
        {{ menu.meta.title }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped lang="less">
.menu-container {
  height: 100%;
  padding: 20px 0;
}
</style>
