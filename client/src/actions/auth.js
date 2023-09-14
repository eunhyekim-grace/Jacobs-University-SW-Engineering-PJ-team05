import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    SET_MESSAGE,
} from './types';

// Retrieve authentication service
import AuthService from '../services/auth.service';


/**
 * Trigger sign up service
 *  */
export const signup = (username, email, password, role) => (dispatch) => {
    return AuthService.signup(username, email, password, role).then(
        (response) => {
            // Change state accordingly
            dispatch({
                type: SIGNUP_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },

        (error) => {
            // Change state accordingly
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();

            dispatch({
                type: SIGNUP_FAILURE,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

/** 
 * Trigger log in service
 * 
 */
export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            // Change state accordingly
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            return Promise.resolve();
        },

        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            // Change state accordingly
            dispatch({
                type: LOGIN_FAILURE,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

/**  
 * Trigger log out service
*/
export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};