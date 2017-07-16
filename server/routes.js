const path = require('path')
const fs = require('fs')
const router = require('koa-router')()
const graphqlHTTP = require('koa-graphql')

const schema = require('./schema')
const rootValue = require('./rootValue')
const getErrorInfo = require('./errorInfo')
const {getUserInfo, getUserSecrets} = require('./db')

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

router.post('/api/login', async (ctx) => {

  const body = ctx.request.body || {}
  const username = ctx.session.username
  const name = username ? username : body.username

  // 无登录信息
  if (!name) return ctx.body = getErrorInfo(4001)

  const userInfo = await getUserInfo(name)
  // 用户不存在
  if (!userInfo) return ctx.body = getErrorInfo(4002)

  userInfo.name = name
  // 从session直接登录
  if (username) return ctx.body = Object.assign({data: userInfo}, getErrorInfo(0))

  const password = await getUserSecrets(name)

  // 密码错误
  if (body.password !== password) return ctx.body = getErrorInfo(4003)

  if (body.password === password) {
    ctx.session.username = name
    return ctx.body = Object.assign({data: userInfo}, getErrorInfo(0))
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
