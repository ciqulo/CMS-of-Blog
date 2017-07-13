import {query} from '../utils/index'

export default {
  getUserInfo () {
    return query.apply(this, arguments)
  },
  login(){
    return query.apply(this, arguments)
  }
}
