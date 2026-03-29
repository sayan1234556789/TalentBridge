import React from 'react'
import { useAuth } from '../context/useAuthContext'
import { Navigate } from 'react-router-dom'

const AuthRedirect = ({children}) => {
    const {token, loading} = useAuth()
    
    if(loading){
        return <h1>loading...</h1>
    }
    if(token){
        return <Navigate to="/dashboard" />
    }

    return children
}

export default AuthRedirect