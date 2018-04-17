import base64 from 'base-64'
import utf8 from 'utf8'

function setCookie (cname, cvalue, exdays) {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue};${expires}`
}

export default {
  getFirstParentEle (el, tag) {
    let node = null
    if (el.tagName === tag) {
      return el
    }
    node = el.parentNode
    while (node && node.tagName !== tag) {
      node = node.parentNode
    }
    return node
  },
  setCookie,
  getCookie (cname) {
    let name = `${cname}=`
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  clearCookie (cname) {
    setCookie(cname, '', -1)
  },
  encodeBase64 (input) {
    return base64.encode(utf8.encode(input))
  },
  decodeBase64 (input) {
    return base64.decode(utf8.decode(input))
  }
}
