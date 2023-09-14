import axios from 'axios';
import { API_URL } from '../constants';

// Utilize authentication API of backend
const URL = API_URL;


// Sign up request to auth/signup/
const signup = (username, email, password, role) => {
    return axios.post(URL + 'signup/', {
        username,
        email,
        password,
        role,
    }, {headers: {
        'Content-Type': 'application/json'
    }}).then(response => { 
        console.log(response)
    })
    .catch(error => {
        console.log(error.response.data.username[0])
    });
};

// Login request to auth/login/
const login = (email, password) => {
    return axios.post(URL + 'login/', {
        email,
        password,
    }).then((response) => {
        // Store user data on localStorage
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

// Remove user content from localStorage on user logout
const logout = () => {
    localStorage.removeItem('user');
};

const AuthService = {
    signup,
    login,
    logout
};

export default AuthService;