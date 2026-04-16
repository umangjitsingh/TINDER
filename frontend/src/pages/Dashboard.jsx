import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed, resetFeed} from "../store/feedSlice.js";
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";


const Dashboard = () => {
   const dispatch = useDispatch();
   const friends = useSelector((state) => state.feed.feed);
   const [toast, setToast] = useState(null);



   useEffect(() => {
      if (!friends) {
         dispatch(fetchFeed())
      }
   }, [])

   useEffect(() => {
      if (toast) {
         const timer = setTimeout(() => {
            setToast(null);
         }, 2000);
         return () => clearTimeout(timer);
      }
   }, [toast]);

   async function handleReview(status,id) {
try{
   const result= await axios.post(`${BACKEND_URL}/api/connection/request/send/${status}/${id}`,{},{withCredentials:true});

   if(result.status === 201) {
      dispatch(resetFeed(id.toString()))
      setToast({
         type: status,
         message: status === 'like' ? 'You liked this profile! 🔥' : 'Profile passed ☃️'
      });
   }
}catch (e) {
   console.log(e)
}
   }

   if (friends && friends.length === 0)
      return (
         <div className="w-full h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">

            {/* Floating emojis background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <span className="absolute top-[20%] left-[15%] text-4xl animate-bounce">✨</span>
               <span className="absolute top-[35%] right-[20%] text-5xl animate-bounce" style={{animationDelay: '1s'}}>💘</span>
               <span className="absolute bottom-[25%] left-[25%] text-4xl animate-bounce" style={{animationDelay: '2s'}}>🌈</span>
               <span className="absolute bottom-[30%] right-[15%] text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>💫</span>
            </div>

            {/* Card */}
            <div className="bg-base-200/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-base-300 max-w-md">
               <h1 className="text-4xl font-bold mb-4 text-base-content/80">
                  You're All Caught Up!
               </h1>

               <p className="text-base-content/60 text-lg mb-6">
                  You’ve seen all available profiles for now.
                  New connections will appear soon.
               </p>

               {/* Cute illustration */}
               <div className="text-7xl mb-6 animate-pulse">🧸💤</div>

               {/* Refresh button */}
               <button
                  onClick={() => dispatch(fetchFeed())}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-content shadow-lg hover:shadow-xl transition-all duration-300 cursor pointer"
               >
                  Refresh 🪠
               </button>
            </div>
         </div>
      );
   return (
      <div className=" w-full  h-[calc(100vh-8rem)] flex justify-center items-start bg-linear-to-br from-base/10 to-accent/10 relative overflow-hidden rounded-4xl">
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] left-[15%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '0s'}}>💕</span>
            <span className="absolute top-[25%] right-[20%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>💬</span>
            <span className="absolute bottom-[20%] left-[20%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🔥</span>
            <span className="absolute bottom-[30%] right-[15%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>✨</span>
         </div>


         {
            friends && friends.length > 0 &&
            friends.map((friend, index) => (
               <div
                  key={friend.id}
                  className={`hover-3d absolute pt-10 ${index === 0 ? 'visible opacity-100' : 'invisible opacity-0'}`}
                  style={{
                     zIndex: friends.length - index
                  }}
               >
                  {/*      */}
                  <figure className="w-96 sm:w-88 lg:w-120 pt-0 rounded-2xl ">


                     <img src={friend?.photoUrl} alt="Tailwind CSS 3D card" className="relative w-full h-100 lg:h-160 object-cover object-center rounded-2xl border-4 border-black -translate-z-2"/>
                     <section className="bg-linear-to-b from-transparent via-base-200/60 to-base-100 absolute bottom-0 w-full h-120">
                        <div className="absolute -bottom-2 w-full h-52">
                           <span className="absolute -top-6 right-10">{friend?.gender}</span><span className="absolute -top-6 right-4 ">{friend?.age}</span>
                           <p className="text-base-content text-4xl text-center font-bold capitalize captain mb-2">{friend?.firstName} {friend?.lastName}</p>
                           <ul className="flex items-center justify-between pt-2 mx-4">
                              {friend.skills?.map((skill, ind) =>
                                 <li key={ind} className="px-4 py-1 bg-secondary rounded-full text-secondary-content text-xs ">{skill}</li>)}
                           </ul>

                           <h4 className="text-xs px-4 py-2">{friend.about}</h4>
                        </div>

                     </section>


                  </figure>
                  {/* 8 empty divs needed for the 3D effect */}
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  {/* */}


                  <div className="absolute -bottom-18 flex items-center gap-4 justify-center w-full z-50">
                     <button className="
    px-4 py-2 rounded-xl border border-cyan-400 text-cyan-300
    shadow-[0_0_4px_rgba(0,255,255,0.4)]
    hover:shadow-[0_0_10px_rgba(0,255,255,0.6)]
    transition-all duration-300
  " onClick={() => {
                        handleReview("pass", friend._id)
                     }}>
                        Pass ☃️
                     </button>

                     <button className="
    px-4 py-2 rounded-xl bg-pink-600 text-white
    shadow-[0_0_15px_rgba(255,0,128,0.2)]
    hover:shadow-[0_0_25px_rgba(255,0,128,7)]
    transition-all duration-300
  " onClick={() => {
                        handleReview("like", friend._id)
                     }}>
                        Like 🔥
                     </button>
                  </div>


               </div>))


         }

         {toast && (
            <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce`}>
               <div className={`alert ${toast.type === 'like' ? 'alert-error' : 'alert-info'} shadow-2xl border-2 ${toast.type === 'like' ? 'border-pink-400' : 'border-cyan-400'} min-w-[260px] sm:min-w-70`}>
                  <span className="text-base sm:text-lg font-semibold">{toast.message}</span>
               </div>
            </div>
         )}
      </div>
   )

}
export default Dashboard


