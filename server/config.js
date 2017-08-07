const DATABASE_PREFIX = 'vwp_'

const databaseConfig = {
  host: 'localhost',
  user: 'ciqu',
  password: '2211ciqu',
  database: 'vwp'
}

const env = process.env || 'development'

module.exports = {
  env,
  databaseConfig,
  DATABASE_PREFIX
}
