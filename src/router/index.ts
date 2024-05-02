import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () =>
      import(/* webpackChunkName: "Match" */ '../layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () =>
          import(
            /* webpackChunkName: "MatchList" */ '../views/home/index.vue'
          ),
      },
    ],
  },
  // 网络错误
  {
    path: '/not-net',
    name: 'NotNet',
    component: () =>
      import(
        /* webpackChunkName: "IpLimit" */ '../views/error-page/not-net.vue'
      ),
  },
  // ip限制
  {
    path: '/ip-limit',
    name: 'IpLimit',
    component: () =>
      import(
        /* webpackChunkName: "IpLimit" */ '../views/error-page/ip-limit.vue'
      ),
  },
  // ip限制
  {
    path: '/404',
    name: 'NotPage',
    component: () =>
      import(
        /* webpackChunkName: "NotPage" */ '../views/error-page/not-find-404.vue'
      ),
  },
  // 错误路由处理
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0, left: 0 }
    }
  },
})

export default router
