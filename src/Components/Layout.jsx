import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer.jsx'
import Navbar from './Navbar/Navbar.jsx'

export default function Layout() {
  return (
    <div>
        <Navbar/>
        <div className="container">
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
