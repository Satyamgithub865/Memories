import axios from 'axios'

const API = axios.create({ baseURL: '' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return req;
})

export const userSignupAPI = (user) => API.post('/user/signup', user);
export const userLoginAPI = (user) => API.post('/user/login', user);
export const createPostAPI = (post) => API.post('/posts/create-post', post);
export const getAllPosts = (page) => API.get(`/posts/get-all-post?page=${page}`);
export const updatePostAPI = (post, id) => API.post(`/posts/update-post/${id}`, post)
export const deletePostAPI = (id) => API.delete(`/posts/delete-post/${id}`);
export const likePostAPI = (id) => API.post(`/posts/like-post/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?title=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPostsById = (id) => API.get(`/posts/post/${id}`);
export const addCommentAPI = (value, id) => API.post(`/posts/comment-post/${id}`, { value });