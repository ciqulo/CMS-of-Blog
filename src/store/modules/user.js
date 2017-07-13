import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import * as queries from '../queries'

import {query} from '../../utils/'

const state = {
  name: null,
  nickname: null,
  isValid: false,
  token: null,
  lastLoginTime: null,
  ip: null,
  role: null,
  user: {}
}

const actions = {
  async [actionTypes.LOGIN] ({commit, state}, payload) {
    const result = await query(queries.LOGIN_QUERY, payload)
    if (result.error) {

    }
    return result
    // commit(mutationTypes.SET_USER, result)
  },

  async [actionTypes.GET_USER_INFO]({commit, state}, payload){
    const result = await query(queries.GET_USER_INFO_QUERY)
    commit(mutationTypes.SET_USER, result)
    return result
  }
}

const mutations = {
  [mutationTypes.SET_USER] (state, user) {
    console.log('user is setting:'+JSON.stringify(user))
    state = {
      ...user,
      isValid: true,
    }
  }
}

export default {
  state,
  actions,
  mutations
}
