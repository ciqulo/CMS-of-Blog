const cookies = {}
const trim = Function.prototype.call.bind(''.trim)

export function getCookie(name) {
  document.cookie
    .split(';')
    .forEach(function (cookie) {
      const pair = cookie.split('=').map(trim)
      cookies[pair[0]] = pair[1]
    })
  return cookies[name]
}

