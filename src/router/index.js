import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/modules/Home.vue'
import ListArticles from '../components/modules/ListArticles.vue'
import Login from '../components/Login.vue'
import Panel from '../components/Panel.vue'


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


router.beforeEach((to, from, next) => {
  if (!store.state.user.isValid && to.path !== '/login') {
    store.dispatch({type: GET_USER_INFO}).then(({data, code, msg}) => {
      if (code != 0) throw msg
      store.commit(SET_USER, {...data, isValid: true})
      next()
    }).catch(e => {
      console.warn(e)
      next({path: '/login'})
    })
  }
  next()
})

export default router
