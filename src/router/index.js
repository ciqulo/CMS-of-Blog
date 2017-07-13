import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/modules/Home.vue'
import ListArticles from '../components/modules/ListArticles.vue'
import Login from '../components/Login.vue'
import Panel from '../components/Panel.vue'


import store from '../store'
import {GET_USER_INFO} from '../store/actionTypes'
const {state, actions} = store

// console.log(state, actions)
//
// console.log(store)
// console.log(store.state.user.isValid)

Vue.use(Router)


const router = new Router({
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

  if (!store.state.user.isValid) {
    store.dispatch({type: GET_USER_INFO})
  }

  next()
})

export default router
