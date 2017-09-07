import {Notification} from 'element-ui';

export async function request(path, payload) {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res
      const error = new Error(response.statusText)
      error.response = response
      throw error
    })
    .then(res => res.json({}))
    .then(res => {
      if (res.code === 200 || res.code === '200') return res
      Notification({
        showClose: true,
        message: res.message,
        type: 'error'
      })
    })
    .catch(err => console.warn(err))
}

