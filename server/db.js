const mysql = require('mysql')

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'ciqu',
//   password: '2211',
//   database: 'vwp'
// })
//
// connection.connect()
// // const i = `INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url) VALUES ('ciqu', '2211', 'a@b.com', 'y.com');`
// // connection.query(i, function (error, results, fields) {
// //   if (error) throw error
// //   console.log('The solution is: ',results, fields)
// // })
// const i = `SELECT * FROM vwp.vwp_users `
// connection.query(i, function (error, results, fields) {
//   if (error) throw error
//   console.log('The solution is: ',results)
// })
//
//
//
// connection.end()


const users = {
  'ciqu': {
    role: 'admin',
    ip: ''
  },
  'lmz': {
    role: 'reckless',
    ip: '223'
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
