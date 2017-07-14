import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import {login, logout, loginWithCredentials} from '../../utils/loginUtils'

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
  },

  async[actionTypes.LOGOUT](){
    return await logout()
  }
}

const mutations = {
  [mutationTypes.SET_USER] (state, user) {
    console.log('user is setting:' + JSON.stringify(user))
    for (const [key, value] of Object.entries(user)) state[key] = value
  }
}

export default {
  state,
  actions,
  mutations
}
