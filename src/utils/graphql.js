export default async function graphql(query) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    credentials: 'include',
    body: query
  })
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res
      const error = new Error(response.statusText)
      error.response = response
      throw error
    })
    .then(res => res.json({}))
    .catch(err => console.warn(err))
}
