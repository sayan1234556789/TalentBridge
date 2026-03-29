import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './routes/ProtectedRoute'
import DashBoard from './pages/DashBoard'
import CreateProject from './pages/CreateProject'
import Projects from './pages/Projects'
import AuthRedirect from './routes/AuthRedirect'

const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/login' element = {
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        } />
      <Route path='/register' element = {
        <AuthRedirect>
          <Register />
        </AuthRedirect>
      } />
      <Route path='/verify/:token' element = {<VerifyEmail />} />
      <Route 
        path='/dashboard'
        element = {
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />

      <Route path='/projects' element = {<CreateProject />} />
      <Route path='/getallprojects' element = {<Projects />} />
    </Routes>
  )
}

export default App