// noinspection JSUnfilteredForInLoop,JSDeprecatedSymbols

import { getLocal } from './storage'
import { CategoryIdName, NumberCn } from '@/enum'
import { i18n } from '@/locale'

// 处理串关组合
/**
 *
 * @param num1 订单数量
 * @param num2 几串
 * @returns
 */
export function recursionMult(num1: number, num2: number): number {
  let denominator = num1
  let molecular = num2
  for (let i = 1; i < num2; i++) {
    denominator = denominator * (num1 - i)
  }
  for (let i = 1; i < num2; i++) {
    molecular = molecular * (num2 - i)
  }
  return denominator / molecular
}

/**
 *
 * @param a
 * @param n
 * @param m
 * @param b
 * @param M
 * @param total
 * @returns
 */
export function Combination(
  a: number[],
  n: number,
  m: number,
  b: number[],
  M: number,
  total: number[][],
) {
  for (let i = n; i >= m; i--) {
    b[m - 1] = i - 1
    if (m > 1) {
      Combination(a, i - 1, m - 1, b, M, total)
    }
    else {
      const temp: number[] = []
      for (let j = M - 1; j >= 0; j--) {
        temp.push(a[b[j]])
      }
      if (temp.length > 0) {
        total.push(temp)
      }
    }
  }

  return total
}

// 获取赔率组合
/**
 *
 * @param list 投注列表
 * @param num 几串
 * @returns
 */
export function oddCombination(list: Array<any>, num: number): any[][] {
  const len = list.length
  const a: number[] = []

  for (let i = 0; i < len; i++) {
    a[i] = i
  }

  const result = Combination(a, len, num, [], num, [])
  const betInterfaceArray: any[][] = []
  for (const arr of result) {
    const temp: any[] = []
    for (const i of arr) {
      temp.push(list[i])
    }
    betInterfaceArray.push(temp)
  }
  return betInterfaceArray
}

// 处理数字保留位数
/**
 *
 * @param num 需要处理的数字
 * @param keep 需要保留的位数
 * @returns
 */
export function toFixedNumber(num: any, keep = 2): number {
  const tempValue = Number(num)
  if (!Number.isNaN(tempValue)) {
    // const result = tempValue.toFixed(keep);
    // return Number(result);
    const result = tempValue.toFixed(keep)

    return Number(result)
  }
  else {
    return 0
  }
}

// 对局的附名方法
export function setItemName(value: number, lang?: string) {
  if (lang) {
    return lang
  }
  switch (value) {
    case 0:
      return i18n.global.t('head_game')
    default:
      return `${i18n.global.t('No')}${
        +getLocal('lang') === 1 || +getLocal('lang') === 3
          ? NumberCn[value]
          : value
      }${i18n.global.t('round')}`
  }
}

// 根据category_id获取盘口的名称
export function categoryIdName(categoryId: string) {
  const categoryIdArr = String(categoryId).split(',')
  const temp = []
  for (const i of categoryIdArr) {
    temp.push(i18n.global.t(CategoryIdName[Number(i)]))
  }
  return temp.join(',')
}

// 获取注单状态
export function getBetListStatus(v: any, is_hide = false): any {
  if (+v.is_cancel === 1) {
    return {
      code: 3,
      color: 'rgba(255,255,255,0.60)',
      name: i18n.global.t('canceled'),
    }
  }
  else if (+v.receive_status === 1) {
    return { code: 1, color: '#FECB00', name: i18n.global.t('tobecomfired') }
  }
  else if (+v.receive_status === 2) {
    return { code: 2, color: '#E24F35', name: i18n.global.t('lost_bet') }
  }
  else if (+v.prize_status === 1) {
    if (is_hide) {
      return { code: 7, color: '#ffffff', name: i18n.global.t('clearinged') }
    }
    return {
      code: 5,
      color: '#F83B30',
      name: i18n.global.t('win_this_game'),
    }
  }
  else if (+v.prize_status === 2) {
    if (is_hide) {
      return { code: 7, color: '#ffffff', name: i18n.global.t('clearinged') }
    }
    return {
      code: 6,
      color: '#18FA9B',
      name: i18n.global.t('lose_this_game'),
    }
  }
  else {
    return { code: 4, color: '#1DE2FF', name: i18n.global.t('not_clearing') }
  }
}

// 处理数字的精度问题
export function toPrecision(value: any = 0) {
  if (value && !Number.isNaN(Number(value))) {
    const tempS = Number(value).toPrecision(12)
    return Number(tempS)
  }
  else {
    return 0
  }
}

/*
 * 年(Y) 可用1-4个占位符
 * 月(m)、日(d)、小时(H)、分(M)、秒(S) 可用1-2个占位符
 * 星期(W) 可用1-3个占位符
 * 季度(q为阿拉伯数字，Q为中文数字)可用1或4个占位符
 *
 * let date = new Date()
 * formatDate(date, "YYYY-mm-dd HH:MM:SS")           // 2020-02-09 14:04:23
 * formatDate(date, "YYYY-mm-dd HH:MM:SS Q")         // 2020-02-09 14:09:03 一
 * formatDate(date, "YYYY-mm-dd HH:MM:SS WWW")       // 2020-02-09 14:45:12 星期日
 * formatDate(date, "YYYY-mm-dd HH:MM:SS QQQQ")      // 2020-02-09 14:09:36 第一季度
 * formatDate(date, "YYYY-mm-dd HH:MM:SS WWW QQQQ")  // 2020-02-09 14:46:12 星期日 第一季度
 */
export function formatDate(date: Date, format: string) {
  const we = date.getDay() // 星期
  const qut = Math.floor((date.getMonth() + 3) / 3).toString() // 季度
  const opt: any = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    'q+': qut, // 季度
  }
  // 中文数字 (星期)
  const week: any = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  }
  // 中文数字（季度）
  const quarter: any = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
  }
  if (/(W+)/.test(format)) {
    // eslint-disable-next-line no-lone-blocks
    {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? `星期${week[we]}`
            : `周${week[we]}`
          : week[we],
      )
    }
    if (/(Q+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 4 ? `第${quarter[qut]}季度` : quarter[qut],
      )
    }
    for (const k in opt) {
      const r = new RegExp(`(${k})`).exec(format)
      // 若输入的长度不为1，则前面补零
      if (r) {
        format = format.replace(
          r[1],
          RegExp.$1.length === 1
            ? opt[k]
            : opt[k].padStart(RegExp.$1.length, '0'),
        )
      }
    }
    return format
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat?: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key: string) => {
    const value: any = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return [
        i18n.global.t('week_days'),
        i18n.global.t('one'),
        i18n.global.t('two'),
        i18n.global.t('three'),
        i18n.global.t('four'),
        i18n.global.t('five'),
        i18n.global.t('six'),
      ][value]
    }
    return value.toString().padStart(2, '0')
  })
}

export function timeOffset(offset: number) {
  const nowDate = new Date().getTime() + offset * 1000 * 60 * 60 * 24 + 1
  return Number(String(nowDate).slice(0, 7).padEnd(13, '0'))
}

export function numberUnit(num: number | string) {
  if (+num > 1000000) {
    return `${(+num / 1000000).toFixed(2)}M`
  }
  else if (+num > 1000) {
    return `${(+num / 1000).toFixed(2)}k`
  }
  else {
    return (+num).toFixed(2)
  }
}

enum langNameKey {
  'cn' = 1,
  'en',
  'tw',
  'th',
  'vn',
  'in',
  'jp',
  'kr',
}

export function getQuickaAmount(numArr: number[]) {
  const set = new Set(numArr)
  let most = 0
  const length = 1
  set.forEach((num: number) => {
    const len = numArr.filter((n) => {
      return num === n
    }).length
    if (len > length) {
      most = num
    }
  })
  if (most) {
    return most
  }
  else {
    return [...set].sort((a, b) => {
      return b - a
    })[0]
  }
}
