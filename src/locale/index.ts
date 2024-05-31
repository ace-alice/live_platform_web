import { createI18n } from 'vue-i18n'

// 导入自定义根语言文件
import rootZhCn from './lang/zh-CN'
import rootZhTw from './lang/zh-TW'
import rootEn from './lang/en-US'
import rootJp from './lang/ja-JP'
import rootId from './lang/id-ID'
import rootKo from './lang/ko-KR'
import rootTh from './lang/th-TH'
import rootVi from './lang/vi-VN'
import { getLocal, setLocal } from '@/utils/storage'
import { LangCode } from '@/enum'

const messages = {
  'zh-CN': {
    ...rootZhCn
  },
  'zh-TW': {
    ...rootZhTw
  },
  'en-US': {
    ...rootEn
  },
  'th-TH': {
    ...rootTh
  },
  'in-ID': {
    ...rootId
  },
  'vi-VN': {
    ...rootVi
  },
  'ja-JP': {
    ...rootJp
  },
  'ko-KR': {
    ...rootKo
  }
}

const langId = Number(getLocal('lang') || 1)

setLocal('lang', langId)

// 导出语言国际化
export const i18n = createI18n({
  legacy: false,
  locale: LangCode[Number(langId)],
  fallbackLocale: LangCode[Number(langId)],
  warnHtmlMessage: 'off',
  messages
})

export function setLocale() {
  const langId = getLocal('lang') || 1
  i18n.global.locale = LangCode[Number(langId)] as any
}
