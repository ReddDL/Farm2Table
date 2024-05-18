import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import UserHeader from './UserHeader.js'
const UserLayout = () => {
  const userId = useOutletContext();
  return (
    <>
        <UserHeader></UserHeader>
        <Outlet context={userId}></Outlet>
    </>
  )
}

export default UserLayout
