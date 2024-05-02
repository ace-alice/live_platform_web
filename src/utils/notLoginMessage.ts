/* eslint-disable no-tabs */
import messageImage from '@/assets/icons/home_tixing.png'
import { i18n } from '@/locale'
const messageText = i18n.global.t('you_not_login_now')

let baseURL = ''
if (window.__WUJIE_PUBLIC_PATH__) {
  baseURL = window.__WUJIE_PUBLIC_PATH__.substring(0, window.__WUJIE_PUBLIC_PATH__.length - 1)
}

export default function (message = '') {
  const NotLoginBox = document.querySelector('#not-login-message')
  if (NotLoginBox) {
    return
  }

  const html5 = `
			<div class="not-login-message">
        <img src="${baseURL}${messageImage}" alt="" />
        <div>${message || messageText}</div>
		</div>
		`

  const body: any = document.body
  const div: HTMLDivElement = document.createElement('div')
  div.setAttribute('id', 'not-login-message')
  div.innerHTML = html5
  body.insertBefore(div, body.childNodes[0])

  setTimeout(() => {
    const el = document.querySelector('#not-login-message')
    el && el.parentNode?.removeChild(el)
  }, 3000)
}
