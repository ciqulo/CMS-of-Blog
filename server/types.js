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

const {getUserInfo, getUserSecrets} = require('./db')

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

        const username = ctx.session.username

        const name = username ? username : args.name
        const userInfo = await getUserInfo(name)

        if(!name){
          console.log(11111)
          return {}
        }


        if (!userInfo) return {info: '用户不存在'}

        // 从session直接登录

        if (username) {
          console.log('zjdl:' + username)
          return userInfo
        }

        const password = await getUserSecrets(name)

        if (args.password !== password) return {info: '密码错误'}

        if (args.password === password) {
          ctx.session.username = name
          return Object.assign(userInfo, {info: '登录成功'})
        }

        return {info: '未知错误'}
      },
      args: {
        password: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        }
      }
    }
  }
})

module.exports = baseType
