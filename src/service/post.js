import {request} from "../utils/index"

export const fetchPostList = async () => {
  return request('/api/post/fetchPostList')
}

export const fetchPost = async (id) => {
  return request('/api/post/fetchPost', {id})
}

export const deletePost = async (id) => {
  return request('/api/post/deletePost', {id})
}

export const createPost = async (data) => {
  const {
    content,
    date,
    title,
    categories,
    tags,
  } = data
  return request('/api/post/createPost', data)
}

export const editPost = async (data) => {
  const {
    content,
    modified,
    title,
    categories,
    tags,
  } = data
  return request('/api/post/createPost', data)
}

export const deletePosts = async (data) => {
  const {ids} = data
  return request('/api/post/updatePost', data)
}
