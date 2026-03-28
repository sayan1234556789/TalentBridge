import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token , setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        const loadUser = async () => {
           const storedToken = localStorage.getItem("token")

           if(!storedToken){
            setLoading(false)
            return
           }

           try {
            const res = await api.get("/users/profile")

            setUser(res.data)
            setToken(storedToken)
           } catch (error) {
            console.log(error)
            localStorage.removeItem("token")
           }

           setLoading(false)
        }
        loadUser()
    },[])

    const login = (data) => {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem("token", data.token)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <AuthContext.Provider value={{token, login, logout, loading, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)