const path = require('path')
const fs = require('fs')
const router = require('koa-router')()
const graphqlHTTP = require('koa-graphql')
const rndString = require('randomstring')
const SHA256 = require('crypto-js/sha256')

const schema = require('./schema')
const rootValue = require('./rootValue')
const getErrorInfo = require('./errorInfo')
const {getUser} = require('./db')

const userTokens = {}

const html = fs.readFileSync(path.resolve('../dist/index.html')).toString()

router.get('/login', async (ctx) => {
  ctx.body = html
})

router.get('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue,
}))

router.post('/graphql', async (ctx, next) => {
  if (!ctx.session.username) return
  await next()
})

router.post('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue,
}))

router.get('*', async (ctx, next) => {
  if (ctx.path.startsWith('/static')) return await next()
  if (!ctx.session.username) return ctx.redirect('/login')
  ctx.body = html
})


router.post('/api/token', async ctx => {

  const {username} = ctx.request.body || {}

  const user = await getUser(username)
  if (!user) return ctx.body = getErrorInfo(4002)
  const token = rndString.generate(30)
  userTokens[username] = token
  ctx.session.token = token
  ctx.session.salt = user.user_salt

  ctx.body = getErrorInfo(0)

})

// session 登录
router.post('/api/loginWithCredentials', async ctx => {

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

  return ctx.body = Object.assign(userInfo, getErrorInfo(0))

})

// 表单提交登录
router.post('/api/login', async ctx => {

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
    return ctx.body = Object.assign(userInfo, getErrorInfo(0))
  }

  ctx.body = getErrorInfo(4004)
})


router.post('/api/logout', async (ctx) => {

  // 无登录信息
  if (!ctx.session.username) return ctx.body = getErrorInfo(4005)

  ctx.session.username = null

  ctx.body = getErrorInfo(0)
})


module.exports = router
