const Koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const graphqlHTTP = require('koa-graphql')
const session = require('koa-session')
const url = require('url')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs')

const rootValue = require('./rootValue')
const schema = require('./schema')

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

app.use(session(CONFIG, app))

app.use(cors({credentials: true}))

router.all('*', async (ctx, next) => {
  if (ctx.path === '/login') return ctx.body = html
  const username = ctx.session.username
  if (!username) {
    if (ctx.method === 'GET' && ctx.path.startsWith('/static')) return await next()
    if (ctx.method === 'POST') return await next()
    return ctx.redirect('/login')
  }
  await next()
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
