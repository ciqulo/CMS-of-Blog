const router = require('koa-router')()
const rndString = require('randomstring')
const SHA256 = require('crypto-js/sha256')

const getErrorInfo = require('../errorInfo')
const connect = require('../db')

const getUser = name => connect.then(async connect => {
  const result = await connect.query(`SELECT * FROM vwp.vwp_users WHERE user_name='${name}'`)
  return result && result.length == 1 ? result[0] : null
})

const getUserByID = id => connect.then(async connect => {
  const result = await connect.query(`SELECT * FROM vwp.vwp_users WHERE ID='${id}'`)
  return result && result.length == 1 ? result[0] : null
})
const userTokens = {}

// 登录时请求临时的token
router.post('/api/user/token', async ctx => {

  const {username} = ctx.request.body || {}

  const user = await getUser(username)
  if (!user) return ctx.body = getErrorInfo(4002)
  const token = rndString.generate(30)
  userTokens[username] = token
  ctx.session.token = token
  ctx.session.salt = user.user_salt

  ctx.body = getErrorInfo(200)

})

// session 登录
router.post('/api/user/loginWithCredentials', async ctx => {

  const username = ctx.session.username
  // 无登录信息
  if (!username) return ctx.body = getErrorInfo(4001)

  const user = await getUser(username)

  // 用户不存在
  if (!user) return ctx.body = getErrorInfo(4002)

  const userInfo = {
    username: user.user_name,
    userEmail: user.user_email,
    userUrl: user.user_url,
    id: user.ID
  }

  return ctx.body = Object.assign({data: userInfo}, getErrorInfo(200))

})

// 表单提交登录
router.post('/api/user/login', async ctx => {

  const {username, password} = ctx.request.body

  const salt = ctx.session.salt
  if (!salt) return ctx.body = getErrorInfo(4004)

  const token = userTokens[username]
  delete userTokens[username]
  if (!token) return ctx.body = getErrorInfo(4004)

  const user = await getUser(username)

  // 用户不存在
  if (!user) return ctx.body = getErrorInfo(4002)

  const pass = SHA256(token + user.user_pass).toString()

  const userInfo = {
    username: user.user_name,
    userEmail: user.user_email,
    userUrl: user.user_url,
    id: user.ID
  }

  // 密码错误
  if (password !== pass) return ctx.body = getErrorInfo(4003)

  if (password === pass) {
    ctx.session.username = username
    ctx.session.token = null
    ctx.session.salt = null
    return ctx.body = Object.assign({data: userInfo}, getErrorInfo(200))
  }

  ctx.body = getErrorInfo(4004)
})


router.post('/api/user/logout', async (ctx) => {

  // 无登录信息
  if (!ctx.session.username) return ctx.body = getErrorInfo(4005)

  ctx.session.username = null

  ctx.body = getErrorInfo(200)
})

router.post('/api/user/createUser', async ctx => {

  let {username, userPass, userEmail, userUrl} = ctx.request.body
  if (username == null) return getErrorInfo(4041)
  if (userPass == null) return getErrorInfo(4042)
  if (userEmail == null) return getErrorInfo(4043)
  username = username.toString().trim()
  userPass = userPass.toString()
  userEmail = userEmail.toString()
  if (username === '') return ctx.body = getErrorInfo(4041)
  const user = await getUser(username)
  if (user) return ctx.body = getErrorInfo(4044)
  if (userPass.length < 2) return ctx.body = getErrorInfo(4045)
  const userSalt = SHA256(rndString.generate(30)).toString()
  userPass = SHA256(userSalt + userPass).toString()

  try {
    await connect.then(connect => connect.query(`
      INSERT INTO vwp.vwp_users (user_name, user_pass, user_email, user_url, user_salt)
      VALUES ('${username}', '${userPass}', '${userEmail}', '${userUrl}', '${userSalt}');
      `)
    )
    ctx.body = getErrorInfo(200)
  } catch (error) {
    console.log(error)
    ctx.body = getErrorInfo(4046)
  }

})

router.post('/api/user/updateUser', async ctx => {

  let {username, userEmail, userUrl, id} = ctx.request.body

  if (!id || typeof id !== 'number') return ctx.body = getErrorInfo(4046)

  if (username == null) username = ''
  else {
    username = username.toString().trim()
    const existedUser = await getUser(username)
    if (existedUser) return ctx.body = getErrorInfo(4044)
  }

  if (userEmail == null) userEmail = ''
  if (userUrl == null) userUrl = ''

  try {
    await connect.then(connect => connect.query(`
      UPDATE vwp.vwp_users SET 
      user_name='${username}',
      user_email='${userEmail}',
      user_url='${userUrl}'
      WHERE ID=${id};
      `)
    )
    ctx.body = getErrorInfo(200)
  } catch (error) {
    console.log(error)
    ctx.body = getErrorInfo(4047)
  }

})

router.post('/api/user/updateUserPass', async ctx => {

  let {id, userPass, newPass} = ctx.request.body

  if (userPass == null || newPass == null || id == null) return ctx.body = getErrorInfo(4049)

  userPass = userPass.toString()
  newPass = newPass.toString()

  const user = await getUserByID(id)
  if (!user) return ctx.body = getErrorInfo(4050)

  const pass = SHA256(user.user_salt + userPass).toString()

  if (pass !== user.user_pass) return ctx.body = getErrorInfo(4048)

  if (newPass.length < 2) return ctx.body = getErrorInfo(4045)

  const userSalt = SHA256(rndString.generate(30)).toString()
  newPass = SHA256(userSalt + newPass).toString()

  try {
    await connect.then(connect => connect.query(`
      UPDATE vwp.vwp_users SET 
      user_salt='${userSalt}',
      user_pass='${newPass}'
      WHERE ID=${id};
      `)
    )
    ctx.body = getErrorInfo(200)
  } catch (error) {
    console.log(error)
    ctx.body = getErrorInfo(4049)
  }

})

module.exports = router
