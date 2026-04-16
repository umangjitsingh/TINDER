import React from 'react';
import { useSwipe } from '../hooks/useSwipe';

/**
 * SwipeCard Component
 * 
 * A Tinder-style swipeable card with like/nope/superlike overlays
 */
const SwipeCard = ({ 
   friend, 
   onSwipeLeft, 
   onSwipeRight, 
   onSwipeUp,
   isTop = true 
}) => {
   const {
      position,
      rotation,
      isDragging,
      swipeDirection,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      swipeLeft,
      swipeRight,
      swipeUp
   } = useSwipe({
      onSwipeLeft: () => onSwipeLeft?.(friend),
      onSwipeRight: () => onSwipeRight?.(friend),
      onSwipeUp: () => onSwipeUp?.(friend),
      threshold: 100
   });

   // Calculate opacity for overlays based on swipe position
   const getOverlayOpacity = (direction) => {
      if (!swipeDirection && !isDragging) return 0;
      
      if (direction === 'right' && position.x > 0) {
         return Math.min(position.x / 100, 1);
      }
      if (direction === 'left' && position.x < 0) {
         return Math.min(Math.abs(position.x) / 100, 1);
      }
      if (direction === 'up' && position.y < 0) {
         return Math.min(Math.abs(position.y) / 100, 1);
      }
      return 0;
   };

   return (
      <div
         className={`absolute w-full max-w-md ${isTop ? 'z-20' : 'z-10 scale-95 opacity-50'}`}
         style={{
            transform: isTop 
               ? `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)` 
               : 'none',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
         }}
         onMouseDown={isTop ? onMouseDown : undefined}
         onMouseMove={isTop ? onMouseMove : undefined}
         onMouseUp={isTop ? onMouseUp : undefined}
         onMouseLeave={isTop ? onMouseLeave : undefined}
         onTouchStart={isTop ? onTouchStart : undefined}
         onTouchMove={isTop ? onTouchMove : undefined}
         onTouchEnd={isTop ? onTouchEnd : undefined}
      >
         {/* Main Card */}
         <div className="relative bg-base-100 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing select-none">
            {/* Image Container */}
            <div className="relative h-[500px]">
               <img 
                  src={friend?.photoUrl || 'https://via.placeholder.com/400x500'} 
                  alt={`${friend?.firstName} ${friend?.lastName}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
               />
               
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

               {/* LIKE Stamp (Right Swipe) */}
               <div 
                  className="absolute top-8 left-8 border-4 border-success rounded-xl px-4 py-2 transform -rotate-12 transition-opacity"
                  style={{ opacity: getOverlayOpacity('right') }}
               >
                  <span className="text-3xl font-bold text-success uppercase tracking-wider">LIKE</span>
               </div>

               {/* NOPE Stamp (Left Swipe) */}
               <div 
                  className="absolute top-8 right-8 border-4 border-error rounded-xl px-4 py-2 transform rotate-12 transition-opacity"
                  style={{ opacity: getOverlayOpacity('left') }}
               >
                  <span className="text-3xl font-bold text-error uppercase tracking-wider">NOPE</span>
               </div>

               {/* SUPER LIKE Stamp (Up Swipe) */}
               <div 
                  className="absolute bottom-32 left-1/2 -translate-x-1/2 border-4 border-info rounded-xl px-4 py-2 transition-opacity"
                  style={{ opacity: getOverlayOpacity('up') }}
               >
                  <span className="text-2xl font-bold text-info uppercase tracking-wider">SUPER LIKE</span>
               </div>
            </div>

            {/* Info Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-base-100 to-transparent">
               {/* Name and Age */}
               <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-base-content capitalize">
                     {friend?.firstName} {friend?.lastName}
                  </h2>
                  <span className="text-2xl text-base-content/70">{friend?.age || '?'}</span>
               </div>

               {/* Gender Badge */}
               <div className="flex items-center gap-2 mb-3">
                  <span className={`badge badge-sm ${
                     friend?.gender === 'male' ? 'badge-primary' : 
                     friend?.gender === 'female' ? 'badge-secondary' : 'badge-neutral'
                  }`}>
                     {friend?.gender || 'other'}
                  </span>
               </div>

               {/* Skills */}
               {friend?.skills && friend.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                     {friend.skills.slice(0, 3).map((skill, idx) => (
                        <span 
                           key={idx} 
                           className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                        >
                           {skill}
                        </span>
                     ))}
                     {friend.skills.length > 3 && (
                        <span className="px-3 py-1 bg-base-300 rounded-full text-sm">
                           +{friend.skills.length - 3}
                        </span>
                     )}
                  </div>
               )}

               {/* About */}
               {friend?.about && (
                  <p className="text-base-content/70 text-sm line-clamp-2">
                     {friend.about}
                  </p>
               )}
            </div>
         </div>

         {/* Action Buttons (Only on top card) */}
         {isTop && (
            <div className="flex justify-center items-center gap-4 mt-6">
               {/* Nope Button */}
               <button 
                  onClick={swipeLeft}
                  className="btn btn-circle btn-lg bg-error/10 hover:bg-error/20 border-error text-error hover:scale-110 transition-transform"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>

               {/* Super Like Button */}
               <button 
                  onClick={swipeUp}
                  className="btn btn-circle btn-md bg-info/10 hover:bg-info/20 border-info text-info hover:scale-110 transition-transform"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
               </button>

               {/* Like Button */}
               <button 
                  onClick={swipeRight}
                  className="btn btn-circle btn-lg bg-success/10 hover:bg-success/20 border-success text-success hover:scale-110 transition-transform"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
               </button>
            </div>
         )}
      </div>
   );
};

export default SwipeCard;
