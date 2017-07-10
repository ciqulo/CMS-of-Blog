import {query} from '../utils/index'

export default {
  getUser (payload) {
    return query(payload)
  },
  login(){
    return query.apply(this, arguments)
  }
}
