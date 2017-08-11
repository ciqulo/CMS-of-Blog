import {request} from "../utils/index"

export const createPost = (data) => {
  const {
    postAuthor,
    postContent,
    postDate,
    postTitle,
    postCategory,
    postTag,
  } = data
  return request('/api/post/createPost', data)
}

export const editPost = (data) => {
  const {
    id,
    postAuthor,
    postContent,
    postModified,
    postTitle,
    postCategory,
    postTag,
  } = data
  return request('/api/post/createPost', data)
}
