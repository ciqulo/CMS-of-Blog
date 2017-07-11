const {GraphQLSchema} = require('graphql')

const baseType = require('./types')

const schema = new GraphQLSchema({
  query: baseType
})

module.exports = schema
