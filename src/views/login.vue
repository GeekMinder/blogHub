<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-main">
    <transition name="slide">
      <div class="login-cpn" :key="router.currentRoute.value.path">
        <div class="login-title">欢迎{{ isLogin ? '登录' : '注册' }}</div>
        <a-form :model="form" @submit-success="handleSubmit">
          <a-form-item
            label="用户名"
            field="username"
            :rules="[{ required: true, message: '用户名必填' }]"
          >
            <a-input v-model="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item
            label="密码"
            field="password"
            :rules="[{ required: true, message: '密码必填' }]"
          >
            <a-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            />
          </a-form-item>

          <a-button :loading="loading" type="primary" html-type="submit">{{
            isLogin ? '登录' : '注册'
          }}</a-button>
        </a-form>

        <div
          class="tip"
          type="text"
          @click="router.push(`${isLogin ? '/signup' : '/login'}`)"
        >
          {{ isLogin ? '我还没有账号, 去注册' : '我已经有账号， 去登录' }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, signup } from '@/api/auth'
import { TokenService } from '@/auth/auth'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores/user'

const loading = ref(false)

const router = useRouter()

const isLogin = computed(() => router.currentRoute.value.path.includes('login'))

const form = reactive({
  username: '',
  password: '',
})
// 登录
const handleLogin = async () => {
  loading.value = true
  try {
    const res = await login({
      username: form.username,
      password: form.password,
    })

    // 假设后端返回的数据中包含 token
    if (res.data?.token) {
      // 存储 token
      TokenService.setToken(res.data?.token)
    }
    if (res.code === 200) {
      Message.success('登录成功, 等待跳转!')
      // 用户信息存储
      const userStore = useUserStore()
      userStore.setUserInfo(res.data.user)
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      Message.error(`登录失败! ${res.message}`)
    }

    loading.value = false

    // 登录成功后跳转
  } catch {
    loading.value = false
    // 登录失败
    Message.error('登录失败')
  }
}

// 注册
const handleSignup = async () => {
  loading.value = true
  try {
    const res = await signup({
      username: form.username,
      password: form.password,
    })

    if (res.code === 200) {
      // 注册成功后跳转登录表
      Message.success('注册成功!')
      router.push('/login')
    } else {
      Message.error(`注册失败! ${res.message}`)
    }
    loading.value = false
  } catch {
    loading.value = false
    // 登录失败
    Message.error('注册失败')
  }
}

const handleSubmit = () => {
  // 表单校验

  if (isLogin.value) {
    handleLogin()
  } else {
    handleSignup()
  }
}
</script>

<style scoped>
.login-main {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-cpn {
  width: 400px;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out;
  position: absolute;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.tip {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  color: cadetblue;
}
</style>
