import { request } from "../utils/index"

export const fetchCategories = () => {
    return request('/api/term/fetchCategories')
}