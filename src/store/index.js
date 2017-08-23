import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import post from './modules/post'
import term from './modules/term'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
    modules: {
        user,
        post,
        term
    },
    strict: DEBUG
})