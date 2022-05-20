//strictly for making the http request, sending the datat back and setting data in local storage

import axios from 'axios'

const API_URL = '/api/users/'

// registering a user

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //this will include the token
    }
    return response.data
}

//login a user 
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //this will include the token
    }
    return response.data
}


const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login 
}

export default authService