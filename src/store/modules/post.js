import {
  FETCH_POST_LIST,
  DELETE_POST,
  DELETE_POSTS,
  CREATE_POST,
  UPDATE_PAGINATION,
} from "../actionTypes"

import {SET_POST_LIST, UPDATE_QUERY} from '../mutationTypes'

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
  tags:[],
  categories:[],
}

const actions = {
  async [FETCH_POST_LIST]({commit, state}, payload) {
    const {code, data} = await fetchPostList({
      current: state.current,
      pageSize: state.pageSize,
      title: state.title,
      start: state.start,
      end: state.end,
      tags: state.tags,
      categories: state.categories,
    })
    if (code === 200) commit(SET_POST_LIST, data)
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
  async [UPDATE_PAGINATION]({commit, state}, {current, pageSize}) {
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
  [UPDATE_QUERY](state, {key, value}) {
    state[key] = value
  }
}

export default {
  state,
  actions,
  mutations
}
