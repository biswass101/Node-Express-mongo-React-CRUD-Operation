import React from 'react'
import Users from './pages/Users'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'
const App = () => {
  return (
    <>
      <Users/>
      <ToastContainer/>
    </>
  )
}

export default App