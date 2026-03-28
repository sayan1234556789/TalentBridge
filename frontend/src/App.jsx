import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './routes/ProtectedRoute'
import DashBoard from './pages/DashBoard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/verify/:token' element = {<VerifyEmail />} />
      <Route 
        path='/dashboard'
        element = {
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App