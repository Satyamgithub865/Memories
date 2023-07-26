import * as api from '../../services/api'
import { FETCH_ALL, CREATE, ERROR, UPDATE, DELETE, LIKE, FETCH_POST_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID, COMMENT } from '../constants/constant'

export const createPostAPI = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const res = await api.createPostAPI(post);
        dispatch({ type: CREATE, payload: res.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
}

export const getAllPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getAllPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message });
    }
}

export const updatePostAPI = (post, id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const res = await api.updatePostAPI(post, id);

        dispatch({ type: UPDATE, payload: res.data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
}

export const deletePostAPI = (id) => async (dispatch) => {
    try {
        await api.deletePostAPI(id);

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
}

export const likePostAPI = (id) => async (dispatch) => {
    try {
        const res = await api.likePostAPI(id);

        dispatch({ type: LIKE, payload: res.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
}

export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_POST_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
};

export const fetchPostsById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsById(id);

        dispatch({ type: FETCH_BY_ID, payload: data });
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
}

export const addCommentAPI = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.addCommentAPI(value, id);

        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message })
    }
}