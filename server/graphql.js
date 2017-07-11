const {
  graphql,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  buildSchema,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLObjectType,
} = require('graphql')

users = {
  'ciqu': {
    password: '111',
    role: 'admin',
    ip: ''
  }
}

const getUser = async function (name) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(users[name])
    }, 100)
  })
}

const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    success: {
      type: GraphQLBoolean
    },
    role: {
      type: GraphQLString,
    },
    info: {
      type: GraphQLString
    }
  }
})

const baseType = new GraphQLObjectType({
  name: 'baseType',
  fields: {
    user: {
      type: userType,
      resolve: async (value, args, ctx) => {
        const {name, password} = args
        const user = await getUser(name)
        const result = {}
        if (!user) result.info = '用户不存在'
        else if (user.password !== password) result.info = '密码错误'
        else if (user.password === password) {
          result.role = user.role
          result.info = '登录成功'
          ctx.session.isLoggedIn = true
        }
        return result
      },
      args: {
        password: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        }
      }
    },

  }
})

const schema = new GraphQLSchema({
  query: baseType
})


const root = {
  user: (args) => {
    console.log(args)
    return {
      role: 'p',
      success: false
    }
  },
  role: () => 'aaaaaaa'
}


module.exports = {
  schema,
  root
}
