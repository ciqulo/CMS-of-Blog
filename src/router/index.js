import Vue from 'vue'
import Router from 'vue-router'
import atob from 'atob'
import Home from '../components/modules/Home.vue'

import Login from '../components/Login.vue'
import Panel from '../components/Panel.vue'

import {getCookie} from '../utils/cookieUtils'
import store from '../store'
import {GET_USER_INFO} from '../store/actionTypes'


import Post from '../components/modules/post/Post.vue'
import PostList from '../components/modules/post/PostList.vue'
import PostEditor from '../components/modules/post/PostEditor.vue'
import PostCategory from '../components/modules/post/PostCategory.vue'
import PostTag from '../components/modules/post/PostTag.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Panel',
      component: Panel,
      children: [
        {
          path: '/',
          component: PostList,
        },
        {
          path: '/post',
          component: Post,
          children: [
            {
              path: '/',
              component: PostList,
            },
            {
              path: 'postList',
              component: PostList,
            },
            {
              path: 'postEditor',
              component: PostEditor,
            },
            {
              path: 'postCategory',
              component: PostCategory,
            },
            {
              path: 'postTag',
              component: PostTag,
            }
          ]
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})


router.beforeEach(async (to, from, next) => {

  if (to.path == '/login') return next()

  const cookie = getCookie('koa:session') || ''

  // cookie 经过 base64 编码
  // 多个页面若有一个退出登录 那么其他页面在路由跳转也会重定向
  const {id} = JSON.parse(atob(cookie) || '{}')

  if (!id) return next({path: '/login'})

  // 如果请求非login页面，并且有cookie，那么使用session登录
  if (!store.state.user.username) {
    const {code} = await store.dispatch('GET_USER_INFO')
    if (code != 200) return next({path: '/login'})
  }
  next()
})

export default router
