import React from 'react'
import { NavLink } from "react-router-dom"
import { FiUsers, FiClock, FiUserCheck } from "react-icons/fi"

const Sidebar = () => {
   const navItems = [
      { to: "/dashboard", icon: FiUsers, label: "Feed" },
      { to: "/pending-request", icon: FiClock, label: "Pending" },
      { to: "/connections", icon: FiUserCheck, label: "Friends" },
   ]

   return (
      <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 py-2 z-40">
         {navItems.map((item) => {
            const Icon = item.icon
            return (
               <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                     group relative flex items-center justify-center w-12 h-12 mx-1
                     rounded-xl transition-all duration-300 ease-out
                     ${isActive 
                        ? 'bg-primary text-primary-content shadow-lg shadow-primary/30' 
                        : 'bg-base-200/80 text-base-content/60 hover:bg-primary/20 hover:text-primary'
                     }
                  `}
               >
                  {({ isActive }) => (
                     <>
                        <Icon className="w-5 h-5" />
                        
                        {/* Tooltip */}
                        <span className="
                           absolute left-14 px-3 py-1.5 min-w-max
                           bg-base-300 text-base-content text-xs font-medium
                           rounded-lg opacity-0 invisible
                           group-hover:opacity-100 group-hover:visible
                           transition-all duration-200 translate-x-2 group-hover:translate-x-0
                           shadow-lg border border-base-content/10
                        ">
                           {item.label}
                        </span>
                        
                        {/* Active indicator dot */}
                        {isActive && (
                           <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                     </>
                  )}
               </NavLink>
            )
         })}
      </div>
   )
}

export default Sidebar
