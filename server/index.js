const Koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const graphqlHTTP = require('koa-graphql')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const url = require('url')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs')

const rootValue = require('./rootValue')
const schema = require('./schema')

const {getUserInfo, getUserSecrets} = require('./db')

const app = new Koa()

const html = fs.readFileSync(path.resolve('../dist/index.html')).toString()

app.keys = ['lmz is reckless']

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
}
app.use(bodyParser())
app.use(session(CONFIG, app))

app.use(cors({credentials: true}))

// router.all('*', async (ctx, next) => {
//   console.log(ctx.method, ctx.path)
//   await next()
// })

router.post('/api/login', async (ctx, next) => {

  const body = ctx.request.body || {}
  const username = ctx.session.username
  const name = username ? username : body.username

  if (!name) return ctx.body = {code: '400', msg: '无登录信息'}

  const userInfo = await getUserInfo(name)

  if (!userInfo) return ctx.body = {code: '400', msg: '用户不存在'}
  // 从session直接登录
  if (username) {
    console.log('直接登录:' + username)
    return ctx.body = {code: '200', msg: '登录成功', data: userInfo}
  }

  const password = await getUserSecrets(name)

  if (body.password !== password) return ctx.body = {code: '400', msg: '密码错误'}

  if (body.password === password) {
    ctx.session.username = name
    return ctx.body = {code: '200', msg: '登录成功', data: userInfo}
  }

  ctx.body = {code: '400', msg: '未知错误'}
})


router.get('*', async (ctx, next) => {
  if (ctx.path.startsWith('/static')) return await next()
  return ctx.body = html
  // const username = ctx.session.username
  // if (ctx.path === '/login' || username) return ctx.body = html
  // ctx.redirect('/login')
})


router.post('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue,
}))

app.use(serve('../dist', {
  defer: true
}))

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
