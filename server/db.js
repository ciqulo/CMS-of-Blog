const mysql = require('promise-mysql')
const databaseConfig = require('./config').databaseConfig

const connect = mysql.createConnection(databaseConfig)

module.exports = connect
