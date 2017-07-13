export async function query(query, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: variables == null ? JSON.stringify({query}) : JSON.stringify({query, variables})
  }).then(res => {
    return res.json()
  }).then(({data, error}) => {
    if (error) {
      console.log(error)
      return {error}
    }
    return {data}
  })
}
