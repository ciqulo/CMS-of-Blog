function responseFormatter() {


  return async function (ctx, next) {
    await next()


    if (/\/graphql/.test(ctx.originalUrl)) {
      console.log(ctx.body)
      const res = ctx.body
    }

  }

}


module.exports = responseFormatter


