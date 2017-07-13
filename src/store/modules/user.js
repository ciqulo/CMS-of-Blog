import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import {login, loginWithCredentials} from '../../utils/login'

const state = {
  name: null,
  nickname: null,
  isValid: false,
  token: null,
  lastLoginTime: null,
  ip: null,
  role: null,
}

const actions = {
  async [actionTypes.LOGIN] ({commit, state}, payload) {
    const {username, password} = payload
    return await login({username, password})
  },

  async [actionTypes.GET_USER_INFO](){
    return await loginWithCredentials()
  }
}

const mutations = {
  [mutationTypes.SET_USER] (state, user) {
    console.log('user is setting:' + JSON.stringify(user))
    state.role = user.role
    state.isValid = user.isValid
  }
}

export default {
  state,
  actions,
  mutations
}
