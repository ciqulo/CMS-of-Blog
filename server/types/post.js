const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

const DATABASE_PREFIX = require('../config').DATABASE_PREFIX

const postType = new GraphQLObjectType({
  name: 'postType',
  sqlTable: DATABASE_PREFIX + 'posts',
  uniqueKey: 'ID',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: '',
      resolve(it) {
        return it.ID
      }
    },
    postTitle: {
      type: GraphQLString,
      sqlColumn: 'post_title',
    },
    postContent: {
      type: GraphQLString,
      sqlColumn: 'post_content',
    },
    postAuthor: {
      type: GraphQLString,
      sqlColumn: 'post_author',
    },
    postDate: {
      sqlColumn: 'post_date',
      type: GraphQLString,
    },
    postModified: {
      sqlColumn: 'post_modified',
      type: GraphQLString,
    }
  })
})


module.exports = postType
