import * as actionTypes from '../actionTypes'
import {SET_POST_LIST} from '../mutationTypes'

import {postsQuery} from '../queries'
import {query} from "../../utils/index"

const state = {
  postLists:[]
}

const actions = {
  async [actionTypes.GET_POST_LIST]({commit}) {
    const result = await query(postsQuery)
    console.log(result)
  }
}

const mutations = {
  [SET_POST_LIST](state, data) {
    state.postLists = data
  }
}

export default {
  state,
  actions,
  mutations
}
