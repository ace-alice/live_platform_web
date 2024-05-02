import messageImage from '@/assets/icons/copywin_01.png'

let baseURL = ''
if (window.__WUJIE_PUBLIC_PATH__) {
  baseURL = window.__WUJIE_PUBLIC_PATH__.substring(0, window.__WUJIE_PUBLIC_PATH__.length - 1)
}

export default function (parentNodeId: string, creacteId: string, message: string, imgUrl?: string) {
  const creacteDom = document.querySelector(`#${creacteId}`)
  if (creacteDom) {
    return
  }

  const parentDom = document.querySelector(parentNodeId)
  if (!parentDom) {
    return
  }

  const html5 = `
  <div class="copy-success">
    <img src="${imgUrl || baseURL + messageImage}" alt="" />
    <div>${message}</div>
</div>
`
  const div: HTMLDivElement = document.createElement('div')
  div.setAttribute('id', creacteId)
  div.innerHTML = html5
  parentDom.insertBefore(div, parentDom.childNodes[0])

  setTimeout(() => {
    const el = document.querySelector(`#${creacteId}`)
    el && el.parentNode?.removeChild(el)
  }, 1500)
}
