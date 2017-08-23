import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'
import * as getterTypes from '../getterNames'
import { fetchCategories } from '../../service/term'

const state = {
    categroyList: []
}
const actions = {
    async [actionTypes.GET_CATEGORY_LIST]({ commit }) {
        const { code, data, message } = await fetchCategories()
        if (code === 200) commit(mutationTypes.SET_CATEGROY_LIST, data)
        return { code, data, message }
    }
}
const mutations = {
    [mutationTypes.SET_CATEGROY_LIST](state, data) {
        state.categroyList = data
    }
}
const getters = {
    [getterTypes.TERM_CATEGORY_LIST]: state => state.categroyList
}
export default {
    state,
    getters,
    actions,
    mutations
}