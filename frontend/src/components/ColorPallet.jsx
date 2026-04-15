import React, { useState, useEffect } from 'react'

const themes = [
   { name: 'nearrock', label: 'Nearrock' },
   { name: 'midnight-purple', label: 'Midnight Purple' },
   { name: 'cyberpunk-neon', label: 'Cyberpunk Neon' },
   { name: 'forest-dark', label: 'Forest Dark' },
   { name: 'sunset-dark', label: 'Sunset Dark' },
   { name: 'nordic-frost', label: 'Nordic Frost' },
   { name: 'glassymax', label: 'Glassymax' },
   { name: 'dancinglol', label: 'Dancinglol' },
]

const ColorPallet = () => {
   const [currentTheme, setCurrentTheme] = useState(() => {
      return localStorage.getItem('app-theme') || 'nearrock'
   })

   // Apply theme + save to localStorage whenever it changes
   useEffect(() => {
      const root = document.getElementById('root')
      if (root) {
         root.setAttribute('data-theme', currentTheme)
      }
      localStorage.setItem('app-theme', currentTheme)
   }, [currentTheme])

   // Listen for theme changes from other components (like Home page)
   useEffect(() => {
      const observer = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
               const newTheme = document.getElementById('root')?.getAttribute('data-theme')
               if (newTheme && newTheme !== currentTheme) {
                  setCurrentTheme(newTheme)
               }
            }
         })
      })

      const root = document.getElementById('root')
      if (root) {
         observer.observe(root, { attributes: true })
      }

      return () => observer.disconnect()
   }, [currentTheme])

   const handleThemeChange = (themeName) => {
      setCurrentTheme(themeName)
   }

   return (
      <div>
         <div className="dropdown dropdown-start">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
               </svg>
            </div>

            <ul
               tabIndex={0}
               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow pl-2"
            >
               {themes.map((theme) => (
                  <li key={theme.name}>
                     <button
                        onClick={() => handleThemeChange(theme.name)}
                        className={currentTheme === theme.name ? 'active' : ''}
                     >
                        {currentTheme === theme.name && (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                        )}
                        {theme.label}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default ColorPallet

