import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {}

const actions = {
  async[actionTypes.GET_POST_LIST]({commit}){
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          postList: [
            {title: 'CMS', author: 'ycwalker', classification: '技术', tag: 'Vue', date: '2017-08-01'},
            {title: '如何实现前端服务化', author: 'Reckless', classification: '技术', tag: 'Javascript,Vue', date: '2017-08-01'}
          ],
          optionsList: [
            {label: '技术博客', value: 1},
            {label: '技术分享', value: 2},
            {label: 'cms', value: 3},
            {label: 'vue', value: 4}
          ]
        }
        resolve(data)
      }, 1000)
    })
  }
}

const mutations = {}

export default {
  state,
  actions,
  mutations
}
