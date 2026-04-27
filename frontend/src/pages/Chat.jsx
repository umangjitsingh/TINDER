


import React, {useEffect, useRef, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import {ArrowLeft, Send, User} from "lucide-react";
import createSocketConnection from "../socketIoConfig.js";
import {useSelector} from "react-redux";
import {BACKEND_URL} from "../BACKEND_URL.js";
import axios from "axios"

const Chat = () => {
   const {targetUserId} = useParams();
   const me = useSelector(state => state.user?.user)

   const [messageText, setMessageText] = useState("")
   const loggedInUserId = me?._id?.toString();
   const navigate = useNavigate();
   const friendsData = useSelector((state) => state.connections?.connections);
   const friends = friendsData?.friends || [];
   const targetUser = friends.find((f) => f._id?.toString() === targetUserId);
   const messagesEndRef = useRef(null);
   const [reply, setReply] = useState([])

   // Helper function to format time to "5:10 PM" format
   const formatTime = (timeValue) => {
      if (!timeValue) return "";
      const date = new Date(timeValue);
      return date.toLocaleTimeString('en-US', {
         hour: 'numeric',
         minute: '2-digit',
         hour12: true
      });
   }



   async function fetchChat(){
      try{
         const response = await axios.get(`${BACKEND_URL}/room/chat/${targetUserId}`, {withCredentials:true});
         if (response.data && response.data.messages) {
            // Transform old messages to match the format expected by the UI
            const formattedMessages = response.data.messages.map((m) => ({
               text: m.messageBody.text,
               time: m.messageBody.time,
               sender: m.messageBody.sender,
               myFirstName: me?.firstName,
               myLastName: me?.lastName,
               myPhotoUrl: me?.photoUrl,
               targetFirstName: targetUser?.firstName,
               targetLastName: targetUser?.lastName,
               targetPhotoUrl: targetUser?.photoUrl
            }));
            setReply(formattedMessages);
         }
      }catch (e) {
         console.log(e.message)
      }
   }

   useEffect(()=>{
      fetchChat()
   },[targetUserId])

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [reply]);

   useEffect(() => {
      if (!loggedInUserId) return;
      const socket = createSocketConnection();
      socket.emit("joinChat", {
          loggedInUserId,
         targetUserId
      });

      socket.on("messageReceived", ({
                                       time, text, sender,myDetails,targetUserDetails
                                    }) => {


         setReply((p)=>[...p,{
            time, text, sender,
            myFirstName: myDetails?.firstName,
            myLastName: myDetails?.lastName,
            myPhotoUrl: myDetails?.photoUrl,
            targetFirstName: targetUserDetails?.firstName,
            targetLastName: targetUserDetails?.lastName,
            targetPhotoUrl: targetUserDetails?.photoUrl
         }])
      })

      return () => {
         socket.disconnect()
      }

   }, [loggedInUserId, targetUserId])



   function handleSendMessage() {
      const newMessage = {
         text  : messageText,
         time  : new Date().toISOString(),
         sender: `${me?.firstName} ${me?.lastName}`
      }

      const socket = createSocketConnection();
      socket.emit("sendMessage", {
         loggedInUserId,
         targetUserId,
         message: newMessage
      });
      setMessageText("")
   }

   return (
      <div className="flex flex-col h-[calc(100vh-10rem)] min-h-112 bg-base-200 rounded-2xl overflow-hidden border border-base-300 shadow-lg w-full max-w-3xl mx-auto">
         {/* Chat Header */}
         <div className="flex items-center gap-3 px-4 py-3 bg-base-100 border-b border-base-300 shrink-0">
            <button
               onClick={() => navigate("/connections")}
               className="btn btn-ghost btn-circle btn-sm"
               aria-label="Go back"
            >
               <ArrowLeft className="w-5 h-5 text-base-content" />
            </button>

            <div className="relative">
               {targetUser?.photoUrl ? (
                  <img
                     src={targetUser.photoUrl}
                     alt={`${targetUser.firstName} ${targetUser.lastName}`}
                     className="w-10 h-10 rounded-full object-cover border border-base-300"
                  />
               ) : (
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                     <User className="w-5 h-5 text-base-100" />
                  </div>
               )}
               <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-100"></span>
            </div>

            <div className="flex-1 min-w-0">
               <h3 className="text-base font-semibold text-base-content truncate capitalize">
                  {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Chat"}
               </h3>
               <p className="text-xs text-base-content/60">
                  {targetUser ? "Online" : "Start chatting"}
               </p>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scroll-smooth">
            {reply.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                     <Send className="w-7 h-7 text-primary/60" />
                  </div>
                  <p className="text-base-content/60 text-sm max-w-xs">
                     {targetUser
                        ? `Say hi to ${targetUser.firstName}!`
                        : "Start a conversation"}
                  </p>
               </div>
            ) : (
               <div className="space-y-3">
                  {reply.map((r, i) => {
                     const isMe = me?.firstName === r?.myFirstName;
                     return (
                        <div
                           key={i}
                           className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                        >
                           <div className="chat-image avatar">
                              <div className="w-8 rounded-full">
                                 <img
                                    alt={r?.myFirstName || "User"}
                                    src={
                                       r?.myPhotoUrl ||
                                       "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
                                    }
                                 />
                              </div>
                           </div>
                           <div className="chat-header">
                              <span className="text-xs opacity-70">
                                 {isMe ? "You" : r?.myFirstName}
                              </span>
                              <time className="text-[10px] opacity-50 ml-1">
                                 {formatTime(r.time)}
                              </time>
                           </div>
                           <div
                              className={`chat-bubble text-sm ${
                                 isMe
                                    ? "chat-bubble-primary text-primary-content"
                                    : "chat-bubble"
                              }`}
                           >
                              {r.text}
                           </div>
                        </div>
                     );
                  })}
                  <div ref={messagesEndRef} />
               </div>
            )}
         </div>

         {/* Input */}
         <div className="px-4 py-3 bg-base-100 border-t border-base-300 shrink-0">
            <div className="flex items-end gap-2">
               <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") handleSendMessage();
                  }}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 input input-bordered bg-base-200 border-base-300 rounded-xl text-sm min-h-10 px-4 focus:outline-none focus:border-primary"
               />
               <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="btn btn-primary btn-circle btn-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
               >
                  <Send className="h-4 w-4" />
               </button>
            </div>
         </div>
      </div>
   )
};


export default Chat;






















































