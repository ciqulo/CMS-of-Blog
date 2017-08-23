import { request } from "../utils/index"

export const fetchCategories = () => request('/api/term/fetchCategories')
