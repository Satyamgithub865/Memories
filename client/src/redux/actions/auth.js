import { SIGNUP, LOGIN, LOGIN_FAIL, SIGNUP_FAIL } from '../constants/constant';
import * as api from '../../services/api'

export const userSignupAPI = (user) => async (dispatch) => {
    try {
        const { data } = await api.userSignupAPI(user);
        dispatch({ type: SIGNUP, payload: data });
    } catch (error) {
        dispatch({ type: SIGNUP_FAIL, payload: error.message });
        return error.message;
    }
}

export const userLoginAPI = (user) => async (dispatch) => {
    try {
        const { data } = await api.userLoginAPI(user);
        dispatch({ type: LOGIN, payload: { accessToken: data.accessToken, user: data.user } })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.message });
        return error.message;
    }
} 