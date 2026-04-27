import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { getMe } from './store/userSlice.js'
import {selectCurrentPersonality} from "./store/themeSlice.js";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";

const Layout = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const hasFetched = useRef(false);

   const { user,loading, isAuthenticated } = useSelector(state => state.user);
   const currentPersonality = useSelector(selectCurrentPersonality)


   // Public routes that don't require authentication
   const publicRoutes = ['/', '/login', '/register']
   const isPublicRoute = publicRoutes.includes(location.pathname)

   // Fetch user on mount
   useEffect(() => {
      if(!hasFetched.current && !user && !loading){
         hasFetched.current = true;
         dispatch(getMe())
      }
   }, [user, loading, dispatch])

   useEffect(() => {
      if (!loading) {
         if (!isAuthenticated && !isPublicRoute) {
            navigate('/login')
         }

         if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
            navigate('/dashboard')
         }
      }
   }, [loading, isAuthenticated, location.pathname])


   if (loading) {
      return (
         <div className="min-h-screen w-full bg-base-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
               <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30 animate-pulse">
                     <span className="text-primary-content font-bold text-4xl">tinder 🔥</span>
                  </div>
                  <div className="absolute inset-0 blur-xl bg-primary/50 rounded-2xl animate-pulse"></div>
               </div>
               <p className="text-base-content/70 text-xl tracking-wide font-medium">
                  Loading, please wait...
               </p>
            </div>
         </div>
      )
   }

   return (
      <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-10 ">
         <Navbar />
         <main className="flex-1 flex flex-col relative">
            <Sidebar/>
            <Outlet />
         </main>
         <Footer personality={currentPersonality} />
      </div>
   )
}

export default Layout

