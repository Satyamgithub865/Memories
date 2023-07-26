import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducers from "./post";

export default combineReducers({
    auth: authReducer,
    posts: postReducers
})