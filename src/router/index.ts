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
      path: '/about-us',
      name: 'AboutUsIndex',
      component: () => import('@/layouts/layout01.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/about-us/index.vue'),
          name: 'AboutUs',
          meta: {
            title: 'router.about_us'
          }
        }
      ]
    }
  ]
})

export default router
