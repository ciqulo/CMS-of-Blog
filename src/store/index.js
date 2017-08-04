import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import post from './modules/post'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    user,
    post
  },
  strict: DEBUG
})
