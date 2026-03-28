import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

const VerifyEmail = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const hasRun = useRef(false)
    useEffect(() => {
        if(hasRun.current) {
            return;
        }
        hasRun.current = true
        if(!token){
            alert('Invalid Link')
            navigate('/register')
            return
        }

        const verifyUser = async () => {
            try {
                const res = await api.get(`/auth/verify/${token}`)

                alert(res.data.message)
                navigate("/login")
            } catch (error) {
                alert("verification failed")
                console.log(error.response?.data || error.message)
            }
        }

        verifyUser()
    },[token, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen bg-white/10'>
        <h1 className='text-xl font-semibold'>Verifying your email...</h1>
    </div>
  )
}

export default VerifyEmail