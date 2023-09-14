import { SET_MESSAGE, CLEAR_MESSAGE } from './types';

/**
 * set Message
 * @param {string} message 
 * @returns {string}
 */
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});


/**
 * clear Message
 * @returns {string}
 */
export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});