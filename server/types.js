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
    role: {type: GraphQLString,},
    info: {type: GraphQLString},
    nickname: {type: GraphQLString},
    lastLoginTime: {type: GraphQLString},
    ip: {type: GraphQLString},
  }
})


const baseType = new GraphQLObjectType({
  name: 'baseType',
  fields: {
    user: {
      type: userType,
      args: {
        password: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        }
      }
    }
  }
})

module.exports = baseType
