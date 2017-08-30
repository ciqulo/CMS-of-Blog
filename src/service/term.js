import {request} from "../utils/index"

export const fetchCategories = () => request('/api/term/fetchCategories')
export const fetchTags = () => request('/api/term/fetchTags')
export const createTags = async (payload) => request('/api/term/createTag', payload)
