import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed, resetFeed} from "../store/feedSlice.js";
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";


const Dashboard = () => {
   const dispatch = useDispatch();
   const friends = useSelector((state) => state.feed.feed);

   console.log("friends", friends)

   useEffect(() => {
      if (!friends) {
         dispatch(fetchFeed())
      }
   }, [])

   async function handleReview(status,id) {
try{
   const result= await axios.post(`${BACKEND_URL}/api/connection/request/send/${status}/${id}`,{},{withCredentials:true});
   console.log(result.data)
   if(result.status === 201) {
      dispatch(resetFeed(id.toString()))
   }
}catch (e) {
   console.log(e)
}
   }

   return (
      <div className=" w-full h-screen flex justify-center items-center bg-linear-to-br from-base/10 to-accent/10 relative overflow-hidden rounded-4xl">
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] left-[15%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '0s'}}>💕</span>
            <span className="absolute top-[25%] right-[20%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>💬</span>
            <span className="absolute bottom-[20%] left-[20%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🔥</span>
            <span className="absolute bottom-[30%] right-[15%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>✨</span>
         </div>


         {
            friends && friends.length > 0 &&
            friends.map((friend) => (
               <div key={friend.id} className="hover-3d absolute">
                  {/*      */}
                  <figure className="w-96 sm:w-88 pt-8 rounded-2xl ">


                     <img src={friend?.photoUrl} alt="Tailwind CSS 3D card" className="relative w-full h-140 object-cover object-center rounded-2xl"/>
                     <section className="bg-linear-to-b from-transparent via-base-200/60 to-base-100 absolute bottom-0 w-full h-120">
                        <div className="absolute bottom-0 w-full h-52">
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


                  <div className="absolute -bottom-18 flex items-center gap-4 justify-center w-full z-100">
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


      </div>
   )
}
export default Dashboard
