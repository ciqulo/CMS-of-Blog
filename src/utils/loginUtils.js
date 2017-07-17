import {getCookie} from './cookieUtils'
import SHA256 from 'crypto-js/sha256'
import atob from 'atob'

export async function login({username, password}) {

  const result = await getSalt(username) || {}
  if (result.code != 0) return result
  const cookie = getCookie('koa:session') || ''
  const {salt, token} = JSON.parse(atob(cookie) || '{}')

  let pass = SHA256(salt + password).toString()
  pass = SHA256(token + pass).toString()
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({username, password: pass})
  }).then(res => {
    return res.json({})
  })
}

export async function loginWithCredentials() {
  return fetch('/api/loginWithCredentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    return res.json({})
  })
}

export async function logout() {
  return fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    return res.json({})
  })
}


async function getSalt(username) {
  return fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({username})
  }).then(res => {
    return res.json({})
  })
}
