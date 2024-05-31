// 引入 router 实例
import router from '@/router'

// 路由加载前
router.beforeEach(async (to, from, next) => {
  next()
})

// 路由加载后
router.afterEach(async (_, from) => {
  //
})
