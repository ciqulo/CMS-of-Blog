const {GraphQLSchema} = require('graphql')

const ROOT_TYPE = require('./types')

const schema = new GraphQLSchema({
  query: ROOT_TYPE
})

module.exports = schema
