users = {
  'ciqu': {
    password: '111',
    role: 'admin',
    ip: ''
  }
}

const getUser = async function (name) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(users[name])
    }, 100)
  })
}

module.exports = {getUser}
