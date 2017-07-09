import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import ListArticles from '../components/ListArticles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
})
