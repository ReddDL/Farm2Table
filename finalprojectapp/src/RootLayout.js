import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header.js'
const RootLayout = () => {
  return (
    <>
        <Header></Header>
        <Outlet></Outlet>
    </>
  )
}

export default RootLayout
