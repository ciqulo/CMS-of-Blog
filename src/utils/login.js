export async function login({username, password}) {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body:JSON.stringify({username, password})
  }).then(res => {
    return res.json({})
  })
}

export async function loginWithCredentials() {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    return res.json({})
  })
}
