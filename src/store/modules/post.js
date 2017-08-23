import * as actionTypes from '../actionTypes'
import { SET_POST_LIST } from '../mutationTypes'
import { POST_LISTS, POST_CATEGORIES, POST_TAGS } from "../getterNames"
import moment from 'moment'

import { fetchPostList, fetchPost } from '../../service/post'
import { deletePost, createPost } from '../../service/post'

const state = {
    postList: []
}

const actions = {
    async [actionTypes.GET_POST_LIST]({ commit }, payload) {
        const { code, message, data } = await fetchPostList(payload)
        const { pageSize, total, totalPages } = data
        console.log(data)
        if (code == 200) commit(SET_POST_LIST, data.postList)
        return { pageSize, total, totalPages, code, message }
    },
    async [actionTypes.INSERT_NEW_POST]({ commit }, payload) {
        return await createPost(payload)
    },
    async [actionTypes.DELETE_POST_LIST]({ commit }, id) {
        return await deletePost(id)
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