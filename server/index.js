const Koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const graphqlHTTP = require('koa-graphql')
const g = require('./graphql')

const app = new Koa()
app.use(cors())
router.get('/', async (ctx, next) => {

  ctx.body = 'Hi~'

})

router.post('/graphql', graphqlHTTP({
  schema: g.schema,
  graphiql: true,
  rootValue: g.root
}))


app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
