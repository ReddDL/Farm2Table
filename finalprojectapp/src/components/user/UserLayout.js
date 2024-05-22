import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import UserHeader from './UserHeader.js'
import axios from 'axios';

export default function UserLayout () {
  // state variable for user information
  const [token, setToken] = useState();

  useEffect(() => {
    try {
      setToken(localStorage.getItem('token'))
    } catch {
      console.log("Error getting token")
    }
  })

  useEffect(() => {
    async function fetchUser () {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/profile`) 
        
        // Add user info (w/o password and id) to localStorage
        localStorage.setItem("user", JSON.stringify(
          Object.fromEntries(Object.entries(res.data).filter(entry => 
            !['password', '_id'].includes(entry[0])
          ))
        ))
      } catch (error) {
        console.log("Error fetching user: ", error)
        // clear localStorage if unauthorized
        if (error?.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.reload()
        }
      }
    }

    if (token) fetchUser()
  })

  return (
    <>
      <UserHeader ></UserHeader>
      <Outlet ></Outlet>
    </>
  )
}
