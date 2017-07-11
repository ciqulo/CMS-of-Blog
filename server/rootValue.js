const rootValue = {
  user: (args) => {
    console.log(args)
    return {
      role: 'p',
      success: false
    }
  },
  role: () => 'aa'
}


module.exports = rootValue
