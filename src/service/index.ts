/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
// noinspection JSIgnoredPromiseFromCall
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import qs from 'qs'
import router from '@/router'
import { i18n } from '@/locale'
import { getLocal } from '@/utils/storage'
import { userInfoStore } from '@/store/userInfo'
import { shopCartStore } from '@/store/shopCart'
import notLoginMessage from '@/utils/notLoginMessage'

let baseURL = window.location.origin
if (window.__WUJIE_PUBLIC_PATH__) {
  baseURL = window.__WUJIE_PUBLIC_PATH__.substring(0, window.__WUJIE_PUBLIC_PATH__.length - 1)
}

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000,
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (config.method === 'get') {
      Object.assign(config.headers, {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }
    else {
      Object.assign(config.headers, {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      })
    }
    if (config.headers) {
      config.headers.token = getLocal('token')
    }
    if (config.data) {
      config.data.lang = getLocal('lang')
    }
    else {
      config.data = {
        lang: getLocal('lang'),
      }
    }

    // config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: any): any => {
    const code = response.status
    if (code < 200 || code > 300) {
      (ElMessage as any)({
        message: i18n.global.t('network_connection_failed'),
        type: 'error',
        duration: 3000,
        customClass: 'virtual-fail-bet',
        offset: 320,
        grouping: true,
      })
      if (router.currentRoute.value.name !== 'NotNet') {
        router.push({ name: 'NotNet' })
      }
      return Promise.reject('error')
    }
    else if (
      parseInt(response.data.code) === 0
      && (parseInt(response.data.error_code) === 18
        || parseInt(response.data.error_code) === 17
        || parseInt(response.data.error_code) === 15)
    ) {
      ElMessage({
        message: response.data.message,
        type: 'error',
        duration: 3000,
        customClass: 'virtual-fail-bet',
        offset: 320,
      })

      // noinspection JSIgnoredPromiseFromCall
      router.push({
        name: 'NotPage',
        query: {
          message: response.data.message,
        },
      })
      return Promise.reject('error')
    }
    else if (
      parseInt(response.data.code) === 0
      || parseInt(response.data.code) === 14
    ) {
      notLoginMessage(response.data.message || response.data.msg)
      return Promise.reject('error')
    }
    else if (
      parseInt(response.data.code) === 602
      || parseInt(response.data.code) === 604
    ) {
      const { loginExit } = userInfoStore()
      loginExit()
      const { clearShopCart } = shopCartStore()
      clearShopCart('parlay')
      clearShopCart('single')
      notLoginMessage(response.data.message || response.data.msg)
      return response
    }
    else {
      return response
    }
  },
  (error) => {
    // 对响应错误做点什么
    (ElMessage as any)({
      message: i18n.global.t('network_connection_failed'),
      type: 'error',
      duration: 3000,
      customClass: 'virtual-fail-bet',
      offset: 320,
      grouping: true,
    })
    if (router.currentRoute.value.name !== 'NotNet') {
      router.push({ name: 'NotNet' })
    }
    return Promise.reject(error)
  },
)

export default service
