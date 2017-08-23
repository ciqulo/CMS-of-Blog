import {FETCH_POST_LIST, DELETE_POST, DELETE_POSTS, CREATE_POST, UPDATE_CURRENT} from "../actionTypes"

import {SET_POST_LIST, SET_CURRENT} from '../mutationTypes'

import {fetchPostList, fetchPost, deletePost, deletePosts, createPost, updatePost} from '../../service/post'

const state = {
  postList: [],
  pageSize: 10,
  current: 1,
  total: null,
  totalPages: null,
}

const actions = {
  async [FETCH_POST_LIST]({commit, state}, payload) {
    const {code, data} = await fetchPostList({
      current: state.current,
      pageSize: state.pageSize
    })
    if (code === 200) commit(SET_POST_LIST, data)
    return code
  },
  async [CREATE_POST]({dispatch}, payload) {
    const {code} = await createPost(payload)
    return code
  },
  async [DELETE_POST]({dispatch}, id) {
    const {code} = await deletePost(id)
    return code
  },
  async [DELETE_POSTS]({dispatch}, ids) {
    const {code} = await deletePosts(ids)
    return code
  },
  async [UPDATE_CURRENT]({commit}, current) {
    const {code, data} = await fetchPostList({current})
    if (code === 200) {
      commit(SET_POST_LIST, data)
      commit(SET_CURRENT, current)
    }
  }
}

const mutations = {
  [SET_POST_LIST](state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value
    }
  },
  [SET_CURRENT](state, current) {
    state.current = current
  }
}

export default {
  state,
  actions,
  mutations
}
