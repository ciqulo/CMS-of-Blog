import {FETCH_CATEGORY} from '../actionTypes'
import {SET_CATEGORIES} from '../mutationTypes'
import {fetchCategories} from '../../service/term'

const state = {
  categories: [],
  tags: []
}
const actions = {
  async [FETCH_CATEGORY]({commit}) {
    const {code, data} = await fetchCategories()
    if (code === 200) commit(SET_CATEGORIES, data)
  }
}
const mutations = {
  [SET_CATEGORIES](state, data) {
    state.categories = data
  }
}

export default {
  state,
  actions,
  mutations
}
