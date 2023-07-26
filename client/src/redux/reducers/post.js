import { FETCH_ALL, CREATE, ERROR, UPDATE, DELETE, LIKE, FETCH_POST_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID, COMMENT } from '../constants/constant'

const postReducers = (state = { isLoading: false, posts: [], error: '' }, action) => {
    switch (action.type) {
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case FETCH_ALL:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
        case FETCH_POST_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_BY_ID:
            return { ...state, post: action.payload };
        case ERROR:
            return { ...state, error: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        default:
            return state;
    }
}

export default postReducers;