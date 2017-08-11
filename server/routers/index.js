const path = require('path')
const fs = require('fs')
const router = require('koa-router')()
const graphqlHTTP = require('koa-graphql')
const combineRouters = require('../middlewares/combine_routers')

const schema = require('../schema')

const user = require('./user')
const post =require('./post')

const html = fs.readFileSync(path.resolve('../dist/index.html')).toString()

router.get('/login', async (ctx) => {
  ctx.body = html
})

router.get('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

router.post('/graphql', async (ctx, next) => {
  // if (!ctx.session.username) return
  await next()
})

router.post('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

router.get('*', async (ctx, next) => {
  if (ctx.path.startsWith('/static')) return await next()
  if (!ctx.session.username) return ctx.redirect('/login')
  ctx.body = html
})


const routers = combineRouters([router, user,post])

module.exports = routers
