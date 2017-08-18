import {request} from "../utils/index"

export const createPost = async (data) => {
  const {
    postContent,
    postDate,
    postTitle,
    postCategory,
    postTag,
  } = data
  return request('/api/post/createPost', data)
}

export const editPost = async (data) => {
  const {
    id,
    postContent,
    postModified,
    postTitle,
    postCategory,
    postTag,
  } = data
  return request('/api/post/createPost', data)
}

export const deletePost = async (data) => {
  const {id} = data
  return request('/api/post/updatePost', data)
}
