import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import backgroundthem from './assets/backgroundthem.png'

function App() {
  const {authUser}=useContext(AuthContext)
  return (
    <div className=" bg-contain"  style={{ backgroundImage: `url(${backgroundthem})` }}>
    <Toaster/>
    <Routes>
      <Route path='/' element={authUser?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/login' element={!authUser?<Login/>:<Navigate to="/"/>}/>
      <Route path='/profile' element={authUser?<Profile/>:<Navigate to="/login"/>}/>
    </Routes>
    </div>
  )
}

export default App