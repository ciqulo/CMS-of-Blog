function responseFormatter() {

  return async function (ctx, next) {
    await next()

    if (/\/graphql/.test(ctx.originalUrl)) {
      const {data} = JSON.parse(ctx.response.body || '{}')
      ctx.body = {
        message: 'success',
        code: 200,
        data
      }
    }
  }
}

module.exports = responseFormatter


