import Vue from 'vue'
import Router from 'vue-router'
import atob from 'atob'
import Home from '../components/modules/Home.vue'
import ListArticles from '../components/modules/ListArticles.vue'
import Login from '../components/Login.vue'
import Panel from '../components/Panel.vue'

import {getCookie} from '../utils/cookieUtils'
import store from '../store'
import {GET_USER_INFO, LOGIN} from '../store/actionTypes'
import {SET_USER} from '../store/mutationTypes'
const {state, actions} = store

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
          component: Home,
        },
        {
          path: '/article',
          component: ListArticles,
          children: [
            {
              path: 'listArticles',
              component: ListArticles
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
  const {username} = JSON.parse(atob(cookie) || '{}')

  if (!username) return next({path: '/login'})

  if (!store.state.user.isValid) {
    const {data, code} = await store.dispatch('GET_USER_INFO')
    if (code != 0) return next({path: '/login'})
    store.commit(SET_USER, {...data, isValid: true})
  }
  next()
})

export default router
