<template>
  <a-layout class="layout-container">
    <!-- header -->
    <a-layout-header class="layout-header">
      <slot name="header">Header</slot>
    </a-layout-header>

    <!-- 主体部分：左右布局 -->
    <a-layout class="layout-main">
      <!-- 左侧sider -->
      <a-layout-sider class="layout-sider" collapsible breakpoint="md">
        <slot name="sider">Sider</slot>
      </a-layout-sider>

      <!-- 右侧上下布局 -->
      <a-layout class="layout-right">
        <!-- 右侧上部content -->
        <a-layout-content class="layout-content">
          <slot name="content">Content</slot>
        </a-layout-content>

        <!-- 右侧下部footer -->
        <a-layout-footer class="layout-footer">
          <slot name="footer">Footer</slot>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>


<script setup lang="ts">


</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.layout-main {
  flex: 1;
  display: flex;
  overflow: auto; // 防止内容溢出
  margin-top: 60px;
}

.layout-header {
  width: 100%;
  padding: 0 20px;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-bg-2);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border-2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.layout-sider {
  height: 100%; // 确保sider填充整个高度
}

.layout-right {
  display: flex;
  flex-direction: column;
}

.layout-content {
  padding: 20px;
}

.layout-footer {
  padding: 20px;
  border-top: 1px solid var(--color-border-2);
}
</style>
