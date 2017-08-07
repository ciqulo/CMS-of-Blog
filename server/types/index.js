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

const postType = require('./post')

const connect = require('../db')

const query = sql => connect.then(cnt => cnt.query(sql))

const joinMonster = require('join-monster').default


const ROOT_TYPE = new GraphQLObjectType({
  name: 'ROOT',
  fields: {
    posts: {
      type: new GraphQLList(postType),
      async resolve(parent, args, context, resolveInfo) {
        const result = await joinMonster(resolveInfo, {}, query, {dialect: 'mysql'})
        return result
      }
    }
  }
})
module.exports = ROOT_TYPE
