import axios from 'axios'

//instance of axios
const api = axios.create({
    // baseURL: "http://localhost:3000/api"
        baseURL: import.meta.env.VITE_BACKENDURL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
