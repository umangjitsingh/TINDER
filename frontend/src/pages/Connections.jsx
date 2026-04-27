import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {getConnections} from "../store/friendSlice.js";
import { Heart, User, Loader2 } from "lucide-react";
import {Link} from 'react-router-dom'

const Connections = () => {
   const dispatch = useDispatch()
   const { connections, loading } = useSelector((state) => state?.connections)

   useEffect(() => {
      dispatch(getConnections())
   }, [dispatch])

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-base-200">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
         </div>
      )
   }

   const friends = connections?.friends || []

   return (
      <div className="min-h-screen bg-base-200 p-6 ">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
               <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                  <h2 className="text-4xl font-bold text-base-content">
                     Your Connections
                  </h2>
                  <Heart className="w-8 h-8 text-primary fill-primary" />
               </div>
               <p className="text-base-content/70 text-lg">
                  {friends.length > 0 
                     ? `You have ${friends.length} special connection${friends.length !== 1 ? 's' : ''}` 
                     : 'Find your special someone'}
               </p>
            </div>

            {/* Empty State */}
            {friends.length === 0 ? (
               <div className="text-center py-20">
                  <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                     <Heart className="w-16 h-16 text-primary/50" />
                  </div>
                  <h3 className="text-2xl font-semibold text-base-content mb-2">
                     No connections yet
                  </h3>
                  <p className="text-base-content/60 max-w-md mx-auto">
                     You don't have any friends yet. Start exploring and send likes to people you're interested in!
                  </p>
               </div>
            ) : (
               /* Connections Grid */
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {friends.map((connection) => (
                     <div 
                        key={connection._id} 
                        className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300 hover:border-primary/50"
                     >
                        {/* Card Header with Heart */}
                        <div className="relative h-32 bg-gradient-to-r from-primary to-secondary">
                           <div className="absolute top-4 right-4">
                              <Heart className="w-6 h-6 text-base-100 fill-base-100/30" />
                           </div>
                           {/* Profile Image */}
                           <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                              {connection.photoUrl ? (
                                 <img 
                                    src={connection.photoUrl} 
                                    alt={`${connection.firstName} ${connection.lastName}`}
                                    className="w-24 h-24 rounded-full border-4 border-base-100 shadow-lg object-cover"
                                 />
                              ) : (
                                 <div className="w-24 h-24 rounded-full border-4 border-base-100 shadow-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <User className="w-12 h-12 text-base-100" />
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* Card Content */}
                        <div className="pt-14 pb-6 px-6 text-center">
                           <h3 className="text-xl font-bold text-base-content mb-1">
                              {connection.firstName} {connection.lastName}
                           </h3>
                           <p className="text-sm text-base-content/60 mb-3">
                              {connection.age} years • {connection.gender}
                           </p>
                           
                           {connection.about && (
                              <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                                 {connection.about}
                              </p>
                           )}

                           {connection.skills && connection.skills.length > 0 && (
                              <div className="flex flex-wrap justify-center gap-2">
                                 {connection.skills.slice(0, 3).map((skill, idx) => (
                                    <span 
                                       key={idx}
                                       className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                    >
                                       {skill}
                                    </span>
                                 ))}
                              </div>
                           )}

                           {/* Heart Badge */}
                           <div className="mt-4 flex items-center justify-center gap-2">
                              <Heart className="w-5 h-5 text-primary fill-primary" />
                              <span className="text-sm text-primary font-medium">Matched</span>
                           </div>

                           <div className="pt-6">
                              <Link to={`/chat/${connection._id}`} className="btn btn-primary btn-sm px-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                 </svg>
                                 Chat
                              </Link>
                           </div>

                        </div>

                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}
export default Connections
