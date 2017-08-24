import {FETCH_CATEGORY, FETCH_TAGS} from '../actionTypes'
import {SET_CATEGORIES, SET_TAGS} from '../mutationTypes'
import {fetchCategories, fetchTags} from '../../service/term'

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
