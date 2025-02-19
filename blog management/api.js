import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getBlogs = () => axios.get(`${API_URL}/blogs`);
export const getBlogById = (id) => axios.get(`${API_URL}/blogs/${id}`);
export const createBlog = (blog) => axios.post(`${API_URL}/blogs`, blog);
export const updateBlog = (id, blog) => axios.put(`${API_URL}/blogs/${id}`, blog);
export const deleteBlog = (id) => axios.delete(`${API_URL}/blogs/${id}`);
