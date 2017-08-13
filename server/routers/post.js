const router = require('koa-router')()
const moment = require('moment')

const getErrorInfo = require('../errorInfo')
const connect = require('../db')

router.post('/api/post/createPost', async ctx => {
  const {postTitle, postDate, postContent, postTag, postCategory} = ctx.request.body || {
    postTitle: '无标题',
    postDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    postContent: '',
  }
  const postAuthor = ctx.session.username

  try {
    await connect.then(connect => connect.query(`
  INSERT INTO vwp.vwp_posts (post_author, post_content, post_title, post_date, post_modified, post_category, post_tag) 
  VALUES ('${postAuthor}', '${postContent}', '${postTitle}', '${postDate}', null, '${postCategory}', '${postTag}');`)
    )
    ctx.body = getErrorInfo(200)
  } catch (error) {
    console.log(error)
    ctx.body = getErrorInfo(4022)
  }
})

router.post('/api/post/updatePost', async ctx => {
  const {postTitle, postContent, postTag, postCategory, id, postModified}
    = ctx.request.body || {
    postTitle: '无标题',
    postDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    postContent: '',
    postModified: moment().format('YYYY-MM-DD HH:mm:ss'),
  }

  if (typeof id !== 'number' && id < 1) return ctx.body = getErrorInfo(4023)
  const postAuthor = ctx.session.username

  try {
    await connect.then(connect => connect.query(`
      UPDATE vwp.vwp_posts SET post_author='${postAuthor}',
      post_content='${postContent}',
      post_title='${postTitle}',
      post_modified='${postModified}',
      post_category='${postCategory}',
      post_tag='${postTag}' WHERE ID='${id}';`)
    )
    ctx.body = getErrorInfo(200)
  } catch (error) {
    console.log(error)
    ctx.body = getErrorInfo(4022)
  }
})

module.exports = router
