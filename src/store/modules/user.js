import api from '../../api/user'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import * as queries from '../queries'

const state = {
  name: null,
  nickname: null,
  isValid: false,
  token: null,
  lastLoginTime: null,
  ip: null,
  role: null,
  user:{}
}

const actions = {
  async [actionTypes.LOGIN] ({commit, state}, payload) {
    commit(mutationTypes.SET_USER, await api.login(
      queries.LOGIN_QUERY,
      payload
    ))
  },

  async [actionTypes.GET_USER_INFO]({commit, state}, payload){
    const result = await api.getUserInfo(queries.GET_USER_INFO_QUERY)

    commit(mutationTypes.SET_USER, result)
  }
}

const mutations = {
  [mutationTypes.SET_USER] (state, user) {
    state.user = user
    console.log(user)
  }
}

export default {
  state,
  actions,
  mutations
}
