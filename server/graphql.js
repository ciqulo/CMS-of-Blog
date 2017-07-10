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

const base = new GraphQLObjectType({
  name: 'user',
  fields: {
    success: {
      type: GraphQLBoolean
    },
    role: {
      type: GraphQLString,
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
  query: base
})
const root = {
  role: (args) => {
    console.log(args)
    return 'player'
  },
  success: () => true
}


module.exports = {
  schema,
  root
}
