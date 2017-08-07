import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import {login, logout, loginWithCredentials} from '../../utils/loginUtils'

const state = {
  username: null,
  role: null,
  userUrl: null,
  userEmail: null,
}

const actions = {
  async [actionTypes.LOGIN] ({commit, state}, payload) {
    const {username, password} = payload
    const {code, message, data} = await login({username, password}) || {}
    if (code === 200) commit(mutationTypes.SET_USER, data)
    return {code, message}
  },

  async [actionTypes.GET_USER_INFO]({commit, state}){
    const {code, message, data} = await loginWithCredentials() || {}
    if (code === 200) commit(mutationTypes.SET_USER, data)
    return {code, message}
  },

  async[actionTypes.LOGOUT](){
    return await logout()
  }
}

const mutations = {
  [mutationTypes.SET_USER] (state, user) {
    for (const [key, value] of Object.entries(user)) state[key] = value
  }
}

export default {
  state,
  actions,
  mutations
}
