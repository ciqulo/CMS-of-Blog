import graphql from '../utils/graphql'

export const fetchPostList = () => graphql(
  `
{
	posts{
		id,
		postContent,
		postTitle,
		postAuthor,
		postDate,
		postCategory,
		postTag
	}
}
`)

export const fetchPost = id => graphql(
  `
{
	posts(id:"${id}"){
		id,
		postContent,
		postTitle,
		postAuthor,
		postDate,
		postCategory,
		postTag
	}
}
`)
