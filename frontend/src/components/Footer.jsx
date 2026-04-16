import React from 'react'


const Footer = ({personality}) => {
   return (
      <footer className="pb-4 pt-10 sm:py-6 px-4 sm:px-6 lg:px-8 mt-auto">
         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
               <span className="text-xl sm:text-2xl">{personality?.emoji || '🔥'}</span>
               <span className="font-bold text-base sm:text-lg">tinder.</span>
            </div>
            <p className="text-xs sm:text-sm text-base-content/60 text-center">
               Express yourself. Find your vibe. Connect for real.
            </p>
         </div>
      </footer>
   )
}
export default Footer
