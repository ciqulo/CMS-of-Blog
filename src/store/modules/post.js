import * as actionTypes from '../actionTypes'
import {SET_POST_LIST} from '../mutationTypes'
import {POST_LISTS, POST_CATEGORIES, POST_TAGS} from "../getterNames"
import moment from 'moment'

import {postLists} from '../../service'
import graphql from "../../utils/graphql"

const state = {
  postList: []
}

const actions = {
  async [actionTypes.GET_POST_LIST]({commit}) {
    const {code, message, data} = await graphql(postLists)
    if (code == 200) commit(SET_POST_LIST, data.posts)
    return {code, message}
  }
}

const mutations = {
  [SET_POST_LIST](state, data) {
    state.postList = data
  }
}

const getters = {
  [POST_LISTS]: state => state.postList.map(post => ({
    ...post,
    postDate: moment(post.postDate).format('YYYY-MM-DD HH:mm')
  })),

  [POST_CATEGORIES]: state => [...new Set(state.postList.map(post => post.postCategory))],
  [POST_TAGS]: state => [...new Set(state.postList.map(post => post.postTag))]
}

export default {
  state,
  getters,
  actions,
  mutations
}
