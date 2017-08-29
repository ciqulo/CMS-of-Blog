import {
  FETCH_POST_LIST,
  DELETE_POST,
  DELETE_POSTS,
  CREATE_POST,
  UPDATE_PAGINATION,
  FETCH_SEARCH_POST,
  UPDATE_SEARCH_POST
} from "../actionTypes"

import {SET_POST_LIST} from '../mutationTypes'

import {fetchPostList, fetchPost, deletePost, deletePosts, createPost, updatePost} from '../../service/post'

const state = {
  postList: [],
  pageSize: 10,
  current: 1,
  total: 0,
  totalPages: 0,
  title: '',
  start: '',
  end: '',
  tag: '',
  category: ''
}

const actions = {
  async [FETCH_POST_LIST]({commit, state}, payload) {
    const {code, data} = await fetchPostList({
      current: state.current,
      pageSize: state.pageSize,
      title: state.title,
      start: state.start,
      end: state.end,
      tag: state.tag,
      category: state.category
    })
    if (code === 200) commit(SET_POST_LIST, data)
    return {code}
  },
  async [FETCH_SEARCH_POST]({commit, state}, payload){
    const {data, code} = await fetchPostList(payload)
    if (code === 200) {
      commit(SET_POST_LIST, data)
      commit(UPDATE_SEARCH_POST, payload)
    }
    return code
  },
  async [CREATE_POST]({dispatch}, payload) {
    const {code} = await
      createPost(payload)
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
  async UPDATE_PAGINATION({commit, state}, {current, pageSize}) {
    current = current || state.current
    pageSize = pageSize || state.pageSize
    const {code, data} = await fetchPostList({current, pageSize})
    if (code === 200) commit(SET_POST_LIST, data)
  },
}

const mutations = {
  [SET_POST_LIST](state, data) {
    for (const [key, value] of Object.entries(data)) {
      state[key] = value
    }
  },
  [UPDATE_SEARCH_POST](state, data){
    for (const [key, value] of Object.entries(data)) {
      state[key] = value
    }
  }
}

export default {
  state,
  actions,
  mutations
}
