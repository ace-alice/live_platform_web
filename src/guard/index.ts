// 引入 router 实例
import router from '@/router'

// 路由加载前
router.beforeEach(async (to, from, next) => {
  if (
    to.query.teamPointIds
    && to.query.game_id
    && to.query.category_id
    && to.name !== 'MatchDetail'
  ) {
    next({
      name: 'MatchDetail',
      query: Object.assign(to.query, { betType: 'single' }),
    })
  }
  else {
    next()
  }
})

// 路由加载后
router.afterEach(async (_, from) => {
  if (from.name === 'NotNet') {
    window.location.reload()
  }
  const ripple = document.querySelector('.tooltip-hover')
  if (ripple && ripple.parentNode) {
    ripple.parentNode.removeChild(ripple)
  }
})
