import { createRouter, createWebHistory } from 'vue-router'
import BlankLayout from '@/layout/BlankLayout.vue'
import BaseLayout from '@/layout/BaseLayout.vue'

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

export default router
