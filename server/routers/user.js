const router = require('koa-router')()
const rndString = require('randomstring')
const SHA256 = require('crypto-js/sha256')

const getErrorInfo = require('../errorInfo')
const connect = require('../db')

const getUser = name => connect.then(async connect => {
  const result = await connect.query(`SELECT * FROM vwp.vwp_users WHERE user_name='${name}'`)
  return result && result.length == 1 ? result[0] : null
})

const userTokens = {}

// 登录时请求临时的token
router.post('/api/user/token', async ctx => {

  const {username} = ctx.request.body || {}

  const user = await getUser(username)
  if (!user) return ctx.body = getErrorInfo(4002)
  const token = rndString.generate(30)
  userTokens[username] = token
  ctx.session.token = token
  ctx.session.salt = user.user_salt

  ctx.body = getErrorInfo(200)

})

// session 登录
router.post('/api/user/loginWithCredentials', async ctx => {

  const username = ctx.session.username
  // 无登录信息
  if (!username) return ctx.body = getErrorInfo(4001)

  const user = await getUser(username)

  // 用户不存在
  if (!user) return ctx.body = getErrorInfo(4002)

  const userInfo = {
    username: user.user_name,
    userEmail: user.user_email,
    userUrl: user.user_url,
  }

  return ctx.body = Object.assign({data: userInfo}, getErrorInfo(200))

})

// 表单提交登录
router.post('/api/user/login', async ctx => {

  const {username, password} = ctx.request.body

  const salt = ctx.session.salt
  if (!salt) return ctx.body = getErrorInfo(4004)

  const token = userTokens[username]
  delete userTokens[username]
  if (!token) return ctx.body = getErrorInfo(4004)

  const user = await getUser(username)

  // 用户不存在
  if (!user) return ctx.body = getErrorInfo(4002)

  const pass = SHA256(token + user.user_pass).toString()

  const userInfo = {
    username: user.user_name,
    userEmail: user.user_email,
    userUrl: user.user_url,
  }

  // 密码错误
  if (password !== pass) return ctx.body = getErrorInfo(4003)

  if (password === pass) {
    ctx.session.username = username
    ctx.session.token = null
    ctx.session.salt = null
    return ctx.body = Object.assign({data: userInfo}, getErrorInfo(200))
  }

  ctx.body = getErrorInfo(4004)
})


router.post('/api/user/logout', async (ctx) => {

  // 无登录信息
  if (!ctx.session.username) return ctx.body = getErrorInfo(4005)

  ctx.session.username = null

  ctx.body = getErrorInfo(200)
})

module.exports = router