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

app.use(async (ctx, next) => {
  !ctx.session.count ? ctx.session.count = 1 : ctx.session.count++
  if (!ctx.session.isLoggedIn) {
    const redirectUrl = '/login?referrer=' + ctx.url
    // ctx.redirect(redirectUrl)
    // return
  }

  await next()
})


router.post('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue,
}))

router.get('*', async (ctx, next) => {

})

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
