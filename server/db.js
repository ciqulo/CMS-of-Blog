const mysql = require('mysql')

const cnt = mysql.createConnection({
  host: 'localhost',
  user: 'ciqu',
  password: '2211',
  database: 'vwp'
})

cnt.connect()
// const i = `INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url) VALUES ('ciqu', '2211', 'a@b.com', 'y.com');`
// connection.query(i, function (error, results, fields) {
//   if (error) throw error
//   console.log('The solution is: ',results, fields)
// })

const userQuery = name => `SELECT * FROM vwp.vwp_users WHERE user_name='${name}'`


const getUser = async name => new Promise((resolve, reject) => {

  cnt.query(userQuery(name), function (error, result) {
    // TODO
    if (error) reject(error)
    resolve(result && result.length == 1 ? result[0] : null)
  })

})

module.exports = {
  getUser
}

// cnt.end()
