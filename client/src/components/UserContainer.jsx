import React, { useEffect, useState } from 'react'
import UserCart from './UserCart'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserContainer = ({isOpen, setIsOpen, form, setForm, setAction, userData, setUserData}) => {
  useEffect(()=> {
    axios.get('http://localhost:5000')
      .then(res => {
        console.log(res)
        if(res.data.success) {
          toast(res.data.message)
          setUserData(res.data.data)
        } else {
          toast(res.data.message)
        }
      })
      .catch(err => {
        console.log(err.message)
        toast(err.message)
      })
  }, [])
  return (
    <div className='max-w-2xl h-full mx-auto overflow-y-scroll 
    flex flex-col gap-5 items-center p-5'>
        {
          userData && userData.map((user, idx) => {
            return (
              <UserCart key={idx} form = {form} setForm = {setForm} setIsOpen = {setIsOpen} setAction = {setAction} {...user} 
              userData = {userData} setUserData = {setUserData}/>
            )
          })
        }
    </div>
  )
}

export default UserContainer