import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '../constants';

const URL = API_URL;

// Retrieve content available to the player
const getPlayerSources = () => {
    return axios.get(URL + 'player', { headers: authHeader() });
};

// Retrieve content available to the instructor
const getInstructorSources = () => {
    return axios.get(URL + 'instructor', { headers: authHeader() });
};

const UserService = {
    getPlayerSources,
    getInstructorSources
};

export default UserService;