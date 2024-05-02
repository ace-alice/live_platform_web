import service from '@/service'

export interface NoticeFromType {
  start_date?: number | null
  end_date?: number | null
  keywords?: number | null
  page: number
  limit: number
}

// 获取公告信息
export function getNoticeInfo(data: NoticeFromType) {
  return service({
    url: '/api/game/game/noticeList',
    method: 'post',
    data,
  })
}

export interface BettingRecordType {
  start_time?: string | null
  end_time?: string | null
  money_type: number | string
  page: number
}
// 获取投注记录
export function getBettingRecord(data: BettingRecordType) {
  return service({
    url: '/api/game/user/getUserHistory/',
    method: 'post',
    data,
  })
}

// 获取串关投注记录详情
export function getUserParlayList(data: any) {
  return service({
    url: '/api/game/user/getUserParlayList',
    method: 'post',
    data,
  })
}

// 获取跑马灯图片
export function getPosterListNew(data?: any) {
  return service({
    url: '/api/game/game/getBannerInfo/',
    method: 'post',
    data,
  })
}

// 获取游戏玩法
export function getGameRuleApi(data: { category_id?: number | string }) {
  return service({
    url: '/api/game/game/getDjRules/',
    method: 'post',
    data,
  })
}
