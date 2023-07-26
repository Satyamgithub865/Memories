import { SIGNUP, LOGIN, LOGOUT, LOGIN_FAIL, SIGNUP_FAIL } from '../constants/constant';

const initialState = {
    user: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return { ...state, user: action.payload, error: null };
        case LOGIN:
            localStorage.setItem('token', action.payload.accessToken);
            return { ...state, user: action.payload.user, error: null };
        case LOGOUT:
            localStorage.clear();
            return state;
        case LOGIN_FAIL:
            return { ...state, user: null, error: action.payload }
        case SIGNUP_FAIL:
            return { ...state, user: null, error: action.payload };
        default:
            return state;
    }
}

export default authReducer;