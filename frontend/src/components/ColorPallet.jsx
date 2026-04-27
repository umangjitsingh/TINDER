import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme, selectCurrentTheme } from '../store/themeSlice'

const themes = [
   { name: 'nearrock', label: 'Nearrock', mode: 'dark' },
   { name: 'midnight-purple', label: 'Midnight Purple', mode: 'dark' },
   { name: 'cyberpunk-neon', label: 'Cyberpunk Neon', mode: 'dark' },
   { name: 'forest-dark', label: 'Forest Dark', mode: 'dark' },
   { name: 'sunset-dark', label: 'Sunset Dark', mode: 'dark' },
   { name: 'nordic-frost', label: 'Nordic Frost', mode: 'dark' },
   { name: 'glassymax', label: 'Glassymax', mode: 'dark' },
   { name: 'dancinglol', label: 'Dancinglol', mode: 'dark' },
   { name: 'soft-light', label: 'Soft Light', mode: 'light' },
   { name: 'warm-light', label: 'Warm Light', mode: 'light' },
   { name: 'nord-light', label: 'Nord Light', mode: 'light' },
]

const ColorPallet = () => {
   const dispatch = useDispatch()
   const currentTheme = useSelector(selectCurrentTheme)

   // Apply theme to DOM whenever it changes
   useEffect(() => {
      const root = document.getElementById('root')
      if (root) {
         root.setAttribute('data-theme', currentTheme)
      }
   }, [currentTheme])

   const handleThemeChange = (themeName) => {
      dispatch(setTheme(themeName))
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
               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow-xl border border-base-300"
            >
               <li className="menu-title text-xs text-base-content/50 uppercase tracking-wider px-3 py-2">Dark Themes</li>
               {themes.filter(t => t.mode === 'dark').map((theme) => (
                  <li key={theme.name}>
                     <button
                        onClick={() => handleThemeChange(theme.name)}
                        className={`rounded-lg ${currentTheme === theme.name ? 'active' : 'hover:bg-base-200'}`}
                     >
                        {currentTheme === theme.name && (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                        )}
                        <span className={`w-3 h-3 rounded-full border border-base-content/20 ${theme.name === currentTheme ? 'bg-primary' : 'bg-neutral'}`} />
                        {theme.label}
                     </button>
                  </li>
               ))}
               <li className="menu-title text-xs text-base-content/50 uppercase tracking-wider px-3 py-2 mt-1">Light Themes</li>
               {themes.filter(t => t.mode === 'light').map((theme) => (
                  <li key={theme.name}>
                     <button
                        onClick={() => handleThemeChange(theme.name)}
                        className={`rounded-lg ${currentTheme === theme.name ? 'active' : 'hover:bg-base-200'}`}
                     >
                        {currentTheme === theme.name && (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                        )}
                        <span className="w-3 h-3 rounded-full bg-primary/80 border border-base-content/20" />
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

