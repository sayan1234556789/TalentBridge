import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuthContext"


const ProtectedRoute = ({children , role}) => {
    const { token, loading , user} = useAuth()

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }
    if(!token){
        return (
            <Navigate to="/login" />
        )
    }

    if(role && user?.role !== role){
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute