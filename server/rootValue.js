const {getUserInfo, getUserSecrets} = require('./db')

const rootValue = {
  user: async (args, ctx) => {
    const username = ctx.session.username

    const name = username ? username : args.username
    const userInfo = await getUserInfo(name)

    if (!name) {
      throw new Error('没有用户')
    }
    if (!userInfo) return {info: '用户不存在'}
    // 从session直接登录
    if (username) {
      console.log('直接登录:' + username)
      return userInfo
    }

    const password = await getUserSecrets(name)

    if (args.password !== password) return {info: '密码错误'}

    if (args.password === password) {
      ctx.session.username = name
      return Object.assign(userInfo, {info: '登录成功'})
    }

    return {info: '未知错误'}
  },
}


module.exports = rootValue
