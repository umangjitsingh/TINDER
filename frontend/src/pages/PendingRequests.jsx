import React, { useEffect, useState } from 'react'
import axios from "axios";
import { BACKEND_URL } from "../BACKEND_URL.js";
import { Loader2, Clock, Check, X, User } from "lucide-react";

const PendingRequests = () => {
   const [pendingRequests, setPendingRequests] = useState([])
   const [loading, setLoading] = useState(true)

   const fetchPendingRequests = async () => {
      try {
         const response = await axios.get(`${BACKEND_URL}/connection/pending-requests`, { withCredentials: true });
         setPendingRequests(response?.data?.requests || [])
      } catch (e) {
         console.log(e.response)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchPendingRequests()
   }, [])

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-base-200">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
         </div>
      )
   }

   const handleRequest = async (status, id) => {
      try {
         const response = await axios.post(
            `${BACKEND_URL}/connection/request/review/${status}/${id}`,
            {},
            { withCredentials: true }
         );
         console.log(response?.data);
         // Refresh the list after accepting/rejecting
         await fetchPendingRequests();
      } catch (e) {
         console.log(e?.response?.data);
      }
   }

   return (
      <div className="min-h-screen bg-base-200 p-6">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
               <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl font-bold text-base-content">Pending Requests</h1>
                  <Clock className="w-8 h-8 text-primary" />
               </div>
               <p className="text-base-content/70 text-lg">
                  {pendingRequests.length > 0 
                     ? `You have ${pendingRequests.length} request${pendingRequests.length !== 1 ? 's' : ''} waiting for your response`
                     : 'No pending requests at the moment'}
               </p>
            </div>

            {/* Empty State */}
            {pendingRequests.length === 0 ? (
               <div className="text-center py-20">
                  <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                     <Clock className="w-16 h-16 text-primary/50" />
                  </div>
                  <h3 className="text-2xl font-semibold text-base-content mb-2">
                     All caught up!
                  </h3>
                  <p className="text-base-content/60 max-w-md mx-auto">
                     No pending requests at the moment. Check back later!
                  </p>
               </div>
            ) : (
               /* Requests Grid */
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingRequests.map((req) => {
                     const user = req.user;
                     return (
                     <div
                        key={req.connectionId || user._id}
                        className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300 hover:border-primary/50"
                     >
                        {/* Card Header */}
                        <div className="relative h-32 bg-gradient-to-r from-primary to-secondary">
                           <div className="absolute top-4 right-4">
                              {req.isIncoming ? (
                                 <Clock className="w-6 h-6 text-base-100/70" />
                              ) : (
                                 <span className="px-2 py-1 bg-base-100/20 text-base-100 text-xs rounded-full">Sent</span>
                              )}
                           </div>
                           {/* Profile Image */}
                           <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                              {user.photoUrl ? (
                                 <img
                                    src={user.photoUrl}
                                    alt={`${user.firstName} ${user.lastName}`}
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
                           <h3 className="text-xl font-bold text-base-content mb-1 capitalize">
                              {user.firstName} {user.lastName}
                           </h3>
                           <p className="text-sm text-base-content/60 mb-3">
                              {user.age} years • {user.gender}
                           </p>

                           {user.about && (
                              <p className="text-base-content/70 text-sm mb-4 line-clamp-2 italic">
                                 "{user.about}"
                              </p>
                           )}

                           {user.skills && user.skills.length > 0 && (
                              <div className="flex flex-wrap justify-center gap-2 mb-6">
                                 {user.skills.map((skill, idx) => (
                                    <span
                                       key={idx}
                                       className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium capitalize"
                                    >
                                       {skill}
                                    </span>
                                 ))}
                              </div>
                           )}

                           {/* Action Buttons */}
                           {req.isIncoming ? (
                              <div className="flex gap-3 justify-center">
                                 <button
                                    className="btn btn-primary btn-sm gap-2"
                                    onClick={() => handleRequest('accepted', user._id)}
                                 >
                                    <Check className="w-4 h-4" />
                                    Accept
                                 </button>
                                 <button
                                    className="btn btn-ghost btn-sm gap-2 text-error hover:bg-error/10"
                                    onClick={() => handleRequest('rejected', user._id)}
                                 >
                                    <X className="w-4 h-4" />
                                    Reject
                                 </button>
                              </div>
                           ) : (
                              <div className="flex justify-center">
                                 <span className="px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium">
                                    Awaiting response
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>
                  )})}
               </div>
            )}
         </div>
      </div>
   )
}
export default PendingRequests
