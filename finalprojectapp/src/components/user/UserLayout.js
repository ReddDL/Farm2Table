import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from './UserHeader.js'
const UserLayout = () => {
  return (
    <>
        <UserHeader></UserHeader>
        <Outlet></Outlet>
    </>
  )
}

export default UserLayout
