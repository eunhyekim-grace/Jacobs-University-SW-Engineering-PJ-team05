import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../actions/types';

// Retrieve user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Retrieve login state
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null} ;

// Authentication reducer
export default function Authentication (state = initialState, action) {
    const { type, payload } = action;

    // Set state depending on success of request
    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}