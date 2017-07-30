const Koa = require('koa')
const cors = require('kcors')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')

const router = require('./routes')

const app = new Koa()

app.keys = ['lmz is reckless']

const CONFIG = {
  key: 'koa:session',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: true,
}

app
  .use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {text: 'application/graphql'}
  }))
  .use(session(CONFIG, app))
  .use(cors({credentials: true}))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('../dist', {defer: true}))

app.listen(3000)
