import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

const Layout = () => {
   return (
      <div className="px-8 bg-zinc-700/10">
         <Navbar/>
         <Outlet/>
      </div>
   )
}
export default Layout
