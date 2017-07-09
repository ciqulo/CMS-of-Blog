const Koa = require('koa')
const router = require('koa-router')()

const http = require('http')

const app = new Koa()
router.get('/', async (ctx, next) => {

  ctx.body = 'Hi~'

})

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)


setTimeout(function () {
  http.get('http://localhost:3000', function (res) {
    let data = ''
    res.on('data', chunk => data += chunk)
    res.on('end', () => console.log(data))
  })
}, 1000)
