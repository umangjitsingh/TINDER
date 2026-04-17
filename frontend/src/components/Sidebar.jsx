import React from 'react'
import { NavLink} from "react-router-dom"
import { FiUsers, FiClock, FiUserCheck } from "react-icons/fi"

const Sidebar = () => {
   return (
      <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 py-4 z-40">

         {/* Review Requests */}
         <NavLink
            to="/review-request"
            className={({isActive})=> isActive ? "active flex justify-between items-center gap-2 py-6 px-2 bg-secondary-200/80 hover:bg-secondary hover:text-secondary-content rounded-r-xl shadow-lg backdrop-blur-sm transition-all duration-300 border-l-4 border-transparent hover:border-secondary":"flex justify-between items-center gap-2 py-6 px-2 bg-base-200/80 hover:bg-primary hover:text-primary-content rounded-r-xl shadow-lg backdrop-blur-sm transition-all duration-300 border-l-4 border-transparent hover:border-primary"}
         >
        <span className="text-xs h-40 font-medium whitespace-nowrap rotate-90 origin-center -translate-x-3/4">
          <span className="flex items-center gap-2">
            <FiUsers className="text-xl" />
            Review Requests
          </span>
        </span>
         </NavLink>

         {/* Pending Requests */}
         <NavLink
            to="/pending-request"
            className={({isActive})=> isActive ? "active flex justify-between items-center gap-2 py-6 px-2 bg-secondary-200/80 hover:bg-secondary hover:text-secondary-content rounded-r-xl shadow-lg backdrop-blur-sm transition-all duration-300 border-l-4 border-transparent hover:border-secondary":"flex justify-between items-center gap-2 py-6 px-2 bg-base-200/80 hover:bg-primary hover:text-primary-content rounded-r-xl shadow-lg backdrop-blur-sm transition-all duration-300 border-l-4 border-transparent hover:border-primary"}
         >
        <span className="text-xs h-40 font-medium whitespace-nowrap rotate-90 origin-center -translate-x-3/4">
          <span className="flex items-center gap-2">
            <FiClock className="text-xl" />
            Pending Requests
          </span>
        </span>
         </NavLink>

         {/* Connections */}
         <NavLink
            to="/connections"
            className={({isActive})=> isActive ? "active flex justify-between items-center gap-2 py-6 px-2 bg-secondary-200/80 hover:bg-secondary hover:text-secondary-content rounded-r-xl shadow-lg backdrop-blur-sm transition-all duration-300 border-l-4 border-transparent hover:border-secondary":"flex justify-between items-center gap-2 py-6 px-2 bg-base-200/80 hover:bg-primary hover:text-primary-content rounded-r-xl shadow-lg backdrop-blur-sm transition-all duration-300 border-l-4 border-transparent hover:border-primary"}
         >
        <span className="text-xs h-40 font-medium whitespace-nowrap rotate-90 origin-center -translate-x-3/4">
          <span className="flex items-center gap-2">
            <FiUserCheck className="text-xl" />
            Connections
          </span>
        </span>
         </NavLink>

      </div>
   )
}

export default Sidebar
