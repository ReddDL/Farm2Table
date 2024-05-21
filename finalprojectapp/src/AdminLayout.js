import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import AdminHeader from './pages/AdminHeader.js'
const AdminLayout = () => {
  const userId = useOutletContext();
  return (
    <>
        <AdminHeader></AdminHeader>
        <Outlet context={userId}></Outlet>
    </>
  )
}

export default AdminLayout
