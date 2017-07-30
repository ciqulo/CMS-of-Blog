export async function query(query, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/graphql',
    },
    credentials: 'include',
    body: variables == null ? JSON.stringify({query}) : JSON.stringify({query, variables})
  })
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res
      const error = new Error(response.statusText);
      error.response = response;
      throw error
    })
    .then(res => res.json({}))
    .catch(err => console.warn(err))
}


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
      const error = new Error(response.statusText);
      error.response = response;
      throw error
    })
    .then(res => res.json({}))
    .catch(err => console.warn(err))
}
