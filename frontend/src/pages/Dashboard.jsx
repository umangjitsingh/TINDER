import React, {useEffect, useState, useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed, resetFeed} from "../store/feedSlice.js";
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";
import { Loader2 } from "lucide-react";


const Dashboard = () => {
   const dispatch = useDispatch();
   const feedData = useSelector((state) => state?.feed?.feed);
   const loading = useSelector((state) => state?.feed?.loading);
   const error = useSelector((state) => state?.feed?.error);
   const friends = feedData?.remainingUsers;

   const [toast, setToast] = useState(null);

   // Always fetch fresh feed when Dashboard mounts
   useEffect(() => {
      dispatch(fetchFeed());
   }, [dispatch])

   useEffect(() => {
      if (toast) {
         const timer = setTimeout(() => {
            setToast(null);
         }, 2000);
         return () => clearTimeout(timer);
      }
   }, [toast]);

   const handleReview = useCallback(async (status, id) => {
      try {
         const result = await axios.post(
            `${BACKEND_URL}/api/connection/request/send/${status}/${id}`,
            {},
            {withCredentials: true}
         );

         if (result.status === 201) {
            dispatch(resetFeed(id.toString()))
            setToast({
               type: status,
               message: status === 'like' ? 'You liked this profile! 🔥' : 'Profile passed ☃️'
            });
         }
      } catch (e) {
         console.error(e);
         const msg = e.response?.data?.message || "Something went wrong";
         setToast({ type: 'error', message: msg });
      }
   }, [dispatch]);

   // Show loading while fetching or before first data arrives
   if (loading || friends == null) {
      return (
         <div className="w-full h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-base-content/60 text-lg">Loading your feed...</p>
         </div>
      );
   }

   // Show error state if fetch failed
   if (error) {
      return (
         <div className="w-full h-[calc(100vh-8rem)] flex flex-col justify-center items-center text-center">
            <div className="bg-base-200/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-base-300 max-w-md">
               <h1 className="text-3xl font-bold mb-4 text-error">Oops!</h1>
               <p className="text-base-content/70 text-lg mb-6">{error}</p>
               <button
                  onClick={() => dispatch(fetchFeed())}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-content shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer font-medium"
               >
                  Retry 🔄
               </button>
            </div>
         </div>
      );
   }

   if (friends.length === 0)
      return (
         <div className="w-full h-[calc(100vh-8rem)] flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="bg-base-200/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-base-300 max-w-md">
               <h1 className="text-4xl font-bold mb-4 text-base-content/80">
                  You're All Caught Up!
               </h1>
               <p className="text-base-content/60 text-lg mb-6">
                  You've seen all available profiles for now.
                  New connections will appear soon.
               </p>
               <div className="text-7xl mb-6">🧸💤</div>
               <button
                  onClick={() => dispatch(fetchFeed())}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-content shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer font-medium"
               >
                  Refresh 🪠
               </button>
            </div>
         </div>
      );

   // Only render top 3 cards for performance; rest are invisible anyway
   const visibleFriends = friends.slice(0, 3);

   return (
      <div className="w-full h-[calc(100vh-8rem)] flex justify-center items-start bg-linear-to-br from-base/10 to-accent/10 relative overflow-hidden rounded-4xl">
         <h1 className="text-xl font-bold mb-4 text-base-content/80 text-center mt-4">
            Discover your next connection
         </h1>

         {visibleFriends.map((friend, index) => (
            <div
               key={friend._id}
               className={`absolute pt-10 ${index === 0 ? 'visible opacity-100' : 'invisible opacity-0'}`}
               style={{
                  zIndex: visibleFriends.length - index,
                  willChange: 'transform',
               }}
            >
               <figure className="w-96 sm:w-88 lg:w-120 pt-0 rounded-2xl">
                  <img
                     src={friend?.photoUrl}
                     alt={`${friend?.firstName} ${friend?.lastName}`}
                     className="relative w-full h-100 lg:h-160 object-cover object-center rounded-2xl border-4 border-black"
                     loading="eager"
                  />
                  <section className="bg-linear-to-b from-transparent via-base-200/60 to-base-100 absolute bottom-0 w-full h-120 pointer-events-none">
                     <div className="absolute -bottom-2 w-full h-60">
                        <span className="absolute -top-6 right-10 text-sm font-medium">{friend?.gender}</span>
                        <span className="absolute -top-6 right-4 text-sm font-medium">{friend?.age}</span>
                        <p className="text-base-content text-4xl text-center font-bold capitalize captain mb-2">
                           {friend?.firstName} {friend?.lastName}
                        </p>
                        <ul className="flex items-center justify-center gap-2 pt-2 mx-4 flex-wrap">
                           {friend.skills?.map((skill, ind) =>
                              <li key={ind} className="px-3 py-1 bg-secondary rounded-full text-secondary-content text-xs">{skill}</li>
                           )}
                        </ul>
                        <h4 className="text-xs px-4 py-2 text-center">{friend.about}</h4>
                     </div>
                  </section>
               </figure>

               <div className="absolute -bottom-18 flex items-center gap-4 justify-center w-full z-50">
                  <button
                     className="px-5 py-2.5 rounded-xl border border-cyan-400 text-cyan-300 shadow-[0_0_4px_rgba(0,255,255,0.4)] hover:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all duration-300 font-medium active:scale-95"
                     onClick={() => handleReview("pass", friend._id)}
                  >
                     Pass ☃️
                  </button>

                  <button
                     className="px-5 py-2.5 rounded-xl bg-pink-600 text-white shadow-[0_0_15px_rgba(255,0,128,0.2)] hover:shadow-[0_0_25px_rgba(255,0,128,0.5)] transition-all duration-300 font-medium active:scale-95"
                     onClick={() => handleReview("like", friend._id)}
                  >
                     Like 🔥
                  </button>
               </div>
            </div>
         ))}

         {toast && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
               <div className={`alert ${toast.type === 'like' ? 'alert-error' : toast.type === 'error' ? 'alert-warning' : 'alert-info'} shadow-2xl border-2 ${toast.type === 'like' ? 'border-pink-400' : toast.type === 'error' ? 'border-yellow-400' : 'border-cyan-400'} min-w-65 sm:min-w-70`}>
                  <span className="text-base sm:text-lg font-semibold">{toast.message}</span>
               </div>
            </div>
         )}
      </div>
   )
}
export default Dashboard


