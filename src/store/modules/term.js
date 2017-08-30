import {FETCH_CATEGORY, FETCH_TAGS, CREATE_TAGS} from '../actionTypes'
import {SET_CATEGORIES, SET_TAGS} from '../mutationTypes'
import {fetchCategories, fetchTags, createTags} from '../../service/term'

const state = {
  categories: [],
  tags: []
}
const actions = {
  async [FETCH_CATEGORY]({commit}) {
    const {code, data} = await fetchCategories()
    if (code === 200) commit(SET_CATEGORIES, data)
  },
  async [FETCH_TAGS]({commit}){
    const {code, data} = await fetchTags()
    if (code === 200) commit(SET_TAGS, data)
  },
  async[CREATE_TAGS]({commit}, payload){
    const {code} = await createTags(payload)
    console.log(code)
    return code
  }
}
const mutations = {
  [SET_CATEGORIES](state, data) {
    state.categories = data
  },
  [SET_TAGS](state, data){
    state.tags = data
  }
}

export default {
  state,
  actions,
  mutations
}
