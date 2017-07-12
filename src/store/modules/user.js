import api from '../../api/user'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import * as queries from '../queries'

const state = {
  nickname: '',
  token: '',
  lastLoginTime: '',
  ip: '',
  role: '',
  user:{}
}

const actions = {
  async [actionTypes.LOGIN] ({commit, state}, payload) {
    commit(mutationTypes.SET_USER, await api.login(
      queries.LOGIN_QUERY,
      payload
    ))
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
