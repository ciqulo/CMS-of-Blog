import { request } from "../utils/index"

export const fetchPostList = async(payload) => {
    return request('/api/post/searchPosts', payload)
}

export const fetchPost = async(id) => {
    return request('/api/post/fetchPost', { id })
}

export const deletePost = async(id) => {
    const params = { ids: id }
    return request('/api/post/deletePosts', params)
}

export const createPost = async(data) => {
    const {
        content,
        date,
        title,
        categories,
        tags,
    } = data
    return request('/api/post/createPost', data)
}

export const editPost = async(data) => {
    const {
        content,
        modified,
        title,
        categories,
        tags,
    } = data
    return request('/api/post/createPost', data)
}

export const deletePosts = async(data) => {
    const { ids } = data
    return request('/api/post/updatePost', data)
}