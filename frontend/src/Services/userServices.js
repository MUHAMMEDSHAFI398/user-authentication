import axios from "../axios";

export const registrationAPI = (data) => {
    return axios.post('/register', data)
}

export const loginAPI = (data) => {
    return axios.post('/login', data)
}

export const googleLoginAPI = (data) => {
    return axios.post('/googleLogin', data)
}

export const authenticateAPI = (token) => {
    return axios.get('/protected', {headers:{Authorization:token}})
}