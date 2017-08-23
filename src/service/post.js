import {request} from "../utils/index"

export const fetchPostList = async (payload) => request('/api/post/searchPosts', payload)

export const fetchPost = async (id) => request('/api/post/fetchPost', {id})

export const deletePost = async (id) => request('/api/post/deletePosts', {ids: [id]})

export const deletePosts = async (ids) => request('/api/post/deletePosts', {ids})

export const createPost = async (data) => request('/api/post/createPost', data)

export const updatePost = async (data) => request('/api/post/updatePost', data)

