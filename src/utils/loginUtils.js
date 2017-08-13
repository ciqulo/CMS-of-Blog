import {getCookie} from './cookieUtils'
import {request} from './index'
import SHA256 from 'crypto-js/sha256'
import atob from 'atob'

export async function login({username, password}) {

  const result = await getSalt(username) || {}
  if (result.code != 200) return result
  const cookie = getCookie('koa:session') || ''
  const {salt, token} = JSON.parse(atob(cookie) || '{}')

  // 传输的密码 = SHA256(token + SHA256(salt + password))
  // token 是临时的，每一次login请求得到一个 用于防止传输后加密的密码从而重放攻击
  let pass = SHA256(salt + password).toString()
  pass = SHA256(token + pass).toString()
  return request('/api/user/login', {username, password: pass})
}

export async function loginWithCredentials() {
  return request('/api/user/loginWithCredentials')
}

export async function logout() {
  return request('/api/user/logout')
}

async function getSalt(username) {
  return request('/api/user/token', {username})
}
