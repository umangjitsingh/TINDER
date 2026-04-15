import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed} from "../store/feedSlice.js";


const Dashboard = () => {
   const dispatch = useDispatch();
   const friends = useSelector((state) => state.feed.feed);
   console.log("friends", friends)

   useEffect(() => {
      dispatch(fetchFeed())
   }, [])

   return (
      <div className="w-full h-[calc(100vh-256px)] flex justify-center items-center">
         {
            friends && friends.length > 0 &&
            friends.map((friend) => (
               <div key={friend.id} className="hover-3d absolute">
                  {/*      */}
                  <figure className="w-96  rounded-2xl">


                     <img src={friend?.photoUrl} alt="Tailwind CSS 3D card" className="relative w-full h-150 object-cover rounded-2xl"/>
                   <section className="bg-linear-to-b from-transparent via-base-200/60 to-base-100 absolute bottom-0 w-full h-120">
                      <div className="absolute bottom-0 w-full h-40">
                         <p className="text-base-content text-4xl text-center font-bold capitalize captain">{friend?.firstName} {friend?.lastName}</p>
                        <ul className="flex items-center justify-between pt-2 mx-4">
                           {friend.skills?.map((skill,ind)=><li key={ind} className="px-4 py-1 bg-secondary rounded-full text-secondary-content text-xs ">{skill}</li>)}
                        </ul>
                         <span>{friend?.gender}</span><span>{friend?.age}</span>
                         <h4>{friend.about}</h4>
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
               </div>))
         }

         {/*   <div */}
         {/*   /!* content *!/*/}

         {/*</div>*/}
      </div>
   )
}
export default Dashboard
