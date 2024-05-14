import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../src//pages/AdminHeader.js'
const AdminLayout = () => {
  return (
    <>
        <AdminHeader></AdminHeader>
        <Outlet></Outlet>
    </>
  )
}

export default AdminLayout
