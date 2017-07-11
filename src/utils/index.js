export function query(query, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
    body: JSON.stringify({
      query,
      variables
    })
  }).then(res => {
    return res.json()
  }).then(data => {
    return data.data
  })
}
