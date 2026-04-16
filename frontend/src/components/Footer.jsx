import React from 'react'


const Footer = ({personality}) => {
   return (
      <footer className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 ">
         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="text-2xl">{personality.emoji}</span>
               <span className="font-bold text-lg">tinder.</span>
            </div>
            <p className="text-sm text-base-content/60">
               Express yourself. Find your vibe. Connect for real.
            </p>
         </div>
      </footer>
   )
}
export default Footer
