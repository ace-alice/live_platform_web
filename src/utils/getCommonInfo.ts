/* eslint-disable no-eval */
/**
 * @description 获取 url 中的 属性值
 * @param url  源路径
 * @param id   属性名
 * @returns    属性值
 */
export const GetParam = function (url: string, id: string) {
  url = `${url}`
  if (!url) {
    return ''
  }
  const regStr = `/(\\?|\\&)${id}=([^\\&]+)/`
  const reg = eval(regStr)
  const result = url.match(reg)
  if (result && result[2]) {
    return result[2]
  }
}

export function getCookie(cname: string) {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(
    document.cookie || window.document.cookie,
  )
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
