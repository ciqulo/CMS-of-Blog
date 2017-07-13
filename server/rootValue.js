// const {getUser} = require('./db')

const rootValue = {
  user: async (args) => {
    console.log(args)



    return {
      role: 'p',
      success: false
    }
  },
  role: () => 'aa'
}


module.exports = rootValue
