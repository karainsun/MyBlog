// 设置cookie
export function setCookie(cname: string, value: string, days: number) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + (d as any).toGMTString()
  document.cookie = cname + '=' + value + '; ' + expires
}
// 获取cookie
export function getCookie(cname: string) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
// 检查cookie
export function checkCookie(name: string) {
  return getCookie(name)
}
