<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <div class="home-container">
    <a-layout>
      <a-layout-header>
        <a-typography-title :heading="3">让我们开始创作吧!</a-typography-title>
      </a-layout-header>

      <a-layout-content>
        <a-space direction="vertical" size="large" fill>
          <a-card>
            <template #title>欢迎来到 BlogHub! 🎉</template>
            <template #extra>
              <a-button type="primary" @click="() => router.push('/publish')">开始发布吧</a-button>
            </template>

          </a-card>

          <a-list :data="[]">
            <template #empty>
              <a-empty description="暂无文章" />
            </template>
          </a-list>
        </a-space>
      </a-layout-content>
    </a-layout>
  </div>
</template>



<style scoped>
.home-container {}

.arco-layout-header {
  padding: 0 20px;
  background: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.arco-layout-content {
  padding: 20px;
  background: var(--color-fill-2);
}

.arco-layout-footer {
  padding: 20px;
  text-align: center;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-border);
}
</style>
