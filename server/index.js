const Koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const graphqlHTTP = require('koa-graphql')
const session = require('koa-session')
const url = require('url')

const rootValue = require('./rootValue')
const schema = require('./schema')

const app = new Koa()

app.keys = ['lmz is reckless']

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
}

app.use(session(CONFIG, app))

app.use(cors({credentials: true}))

router.get('*', async (ctx, next) => {
  !ctx.session.count ? ctx.session.count = 1 : ctx.session.count++
  const username = ctx.session.username
  if (!username) {
    // const redirectUrl = '/login?referrer=' + ctx.url
    const redirectUrl = 'http://localhost:8080/#/login'
    ctx.redirect(redirectUrl)
    return
  }

  await next()
})

// app.use(async (ctx, next) => {
//   !ctx.session.count ? ctx.session.count = 1 : ctx.session.count++
//   const username = ctx.session.username
//   if (!username) {
//     // const redirectUrl = '/login?referrer=' + ctx.url
//     const redirectUrl = 'http://localhost:8080/#/login'
//     ctx.redirect(redirectUrl)
//     return
//   }
//
//   await next()
// })


router.post('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue,
}))

router.get('*', async (ctx, next) => {

  ctx.redirect('http://localhost:8080/')
})

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
