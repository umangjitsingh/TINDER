import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { getMe } from './store/userSlice.js'

const Layout = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()

   const { user,loading, isAuthenticated } = useSelector(state => state.user)

   // Public routes that don't require authentication
   const publicRoutes = ['/', '/login', '/register']
   const isPublicRoute = publicRoutes.includes(location.pathname)

   // Fetch user on mount
   useEffect(() => {
      if(!user && !loading){
         dispatch(getMe())
      }
   }, [])

   // Redirect when loading finishes and user is NOT authenticated (only for protected routes)
   useEffect(() => {
      if (!loading && !isAuthenticated && !isPublicRoute) {
         navigate('/login')
      }
   }, [loading, isAuthenticated, navigate, isPublicRoute])

   if (loading) {
      return (
         <div className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
               <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-pink-500/30 animate-pulse">
                     <span className="text-white font-bold text-4xl">tinder 🔥</span>
                  </div>
                  <div className="absolute inset-0 blur-xl bg-pink-500/50 rounded-2xl animate-pulse"></div>
               </div>
               <p className="text-gray-300 text-xl tracking-wide font-medium">
                  Loading, please wait...
               </p>
            </div>
         </div>
      )
   }

   return (
      <div className="w-full min-h-screen px-10">
         <Navbar />
         <Outlet />
      </div>
   )
}

export default Layout

