import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
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
})

export default router
