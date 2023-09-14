import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

// Message reducer
export default function messageReduce (state = initialState, action) {
    const { type, payload } = action;

    // Set message depending on request
    switch (type) {
        case SET_MESSAGE:
            return { message: payload };

        case CLEAR_MESSAGE:
            return { message: '' };

        default:
            return state;
    }
}