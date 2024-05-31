// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: setupLayouts(routes)
  routes: [
    { path: '/', name: 'Index', redirect: '/home' },
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
    },
    {
      path: '/live',
      name: 'LiveIndex',
      component: () => import('@/layouts/layout01.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/live/index.vue'),
          name: 'Live',
          meta: {
            title: 'router.live'
          }
        },
        {
          path: ':name',
          component: () => import('@/pages/live/[name]/index.vue'),
          name: 'LiveName',
          meta: {
            title: 'router.live_name'
          }
        }
      ]
    }
  ]
})

export default router
