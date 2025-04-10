<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header-main">
    <div class="header-left">
      <a-typography-text
        :style="{ fontSize: '20px', fontWeight: 800, cursor: 'pointer' }"
        @click="goHome"
        >😍 BlogHub</a-typography-text
      >
    </div>
    <div class="header-right">
      <a-space>
        <a-button type="text">
          <template #icon>
            <icon-github size="20px" />
          </template>
        </a-button>
        <a-button type="text" @click="handleThemeChange">
          <template #icon>
            <icon-moon-fill size="20px" v-if="theme === 'light'" />
            <icon-sun-fill size="20px" v-else />
          </template>
        </a-button>
        <a-popover>
          <a-button type="text">
            <template #icon>
              <icon-user size="20px" />
            </template>
          </a-button>
          <template #content>
            <a-space direction="vertical">
              <div>用户名：{{ userStore.userInfo?.username || '' }}</div>
              <div>
                角色：{{
                  userStore.userInfo?.role === 1 ? '管理员' : '普通用户'
                }}
              </div>
              <a-button type="text" @click="handleLogout">退出登录</a-button>
            </a-space>
          </template>
        </a-popover>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconMoonFill,
  IconSunFill,
  IconGithub,
} from '@arco-design/web-vue/es/icon'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { TokenService } from '@/auth/auth'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores/user'

// 初始化store
const themeStore = useThemeStore()
// 方法直接解构
const { handleThemeChange } = themeStore
// 状态用storetoref解构
const { theme } = storeToRefs(themeStore)

const router = useRouter()

const userStore = useUserStore()

function goHome() {
  router.push('/home')
}

const handleLogout = () => {
  TokenService.clearTokens()
  userStore.clearUserInfo()
  Message.success('退出成功')
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-main {
  .flex-between();
  height: 60px;
  width: 100%;
}

.header-left {
  .align-center();
}

.header-right {
}
</style>
