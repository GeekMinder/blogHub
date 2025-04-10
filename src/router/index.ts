import { createRouter, createWebHistory } from 'vue-router'
import BlankLayout from '@/layout/BlankLayout.vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import { TokenService } from '@/auth/auth'
import { Message } from '@arco-design/web-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: BlankLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login.vue'),
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import('@/views/login.vue'),
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      component: BaseLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home.vue'),
          meta: {
            title: '首页',
            icon: 'icon-home',
            showInMenu: true,
          },
        },
      ],
    },
    {
      path: '/publish',
      name: 'publish',
      component: BaseLayout,
      children: [
        {
          path: '/publish',
          name: 'publish',
          component: () => import('@/views/publish.vue'),
          meta: {
            title: '发布',
            icon: 'icon-send',
            showInMenu: true,
          },
        },
      ],
    },
  ],
})

// 路由守卫

// 需要登录才能访问的路由
const authRoutes = ['/publish', '/home']

router.beforeEach((to, from, next) => {
  const token = TokenService.getToken()

  // 如果访问需要认证的页面但没有token
  if (authRoutes.includes(to.path) && !token) {
    Message.error('请先登录')
    next('/login')
    return
  }

  // 如果已登录还访问登录页，跳转到首页
  if (['/login', '/signup'].includes(to.path) && token) {
    next('/')
    return
  }

  next()
})

export default router
