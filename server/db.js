const users = {
  'ciqu': {
    password: '111',
    role: 'admin',
    ip: ''
  }
}

const secrets = {
  'ciqu': '111'
}

const getUserInfo = async function (name) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(users[name])
    }, 100)
  })
}

const getUserSecrets = async function (name) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(secrets[name])
    }, 100)
  })
}

module.exports = {
  getUserInfo,
  getUserSecrets
}
