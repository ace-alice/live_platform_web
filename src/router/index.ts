// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: setupLayouts(routes)
  routes: [
    { path: '/', name: 'Index', redirect: '/channel' },
    {
      path: '/channel',
      name: 'Channel',
      component: () => import('@/pages/channel/index.vue'),
      redirect: '/channel/v/home',
      children: [
        {
          path: 'v/:code',
          component: () => import('@/pages/channel/code.vue'),
          name: 'channelCode',
          meta: {
            title: 'router.home'
          }
        }
      ]
    },
    {
      path: '/home',
      name: 'HomeIndex',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/home/index.vue'),
          name: 'Home',
          meta: {
            title: 'router.home'
          }
        }
      ]
    }
  ]
})

export default router
