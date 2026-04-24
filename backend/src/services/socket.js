import {Server} from "socket.io"
import {FRONTEND_URL} from "../FRONTEND_URL.js";
import getTargetUser from "../config/getTargetUser.js";


const initializeSocket = (appServer) => {
   const io = new Server(appServer, {
      cors: {
         origin: FRONTEND_URL,
         credentials: true
      }
   })


   io.on("connection", (socket) => {
      socket.on("joinChat", ({
                                loggedInUserId,
                                targetUserId
                             }) => {
         const roomId = [loggedInUserId, targetUserId].sort().join("_");
         socket.join(roomId)


      });

      socket.on("sendMessage",async ({
                                   loggedInUserId,
                                   targetUserId, message
                                }) => {


         const targetUserDetails = await getTargetUser(targetUserId);
         const myDetails = await getTargetUser(loggedInUserId);

         if (!myDetails || !targetUserDetails) return;

         const roomId = [loggedInUserId, targetUserId].sort().join("_");

         const {text, time, sender} = message;

         io.to(roomId).emit("messageReceived", {
            time, text, sender, myDetails, targetUserDetails
         })


      });

      socket.on("disconnect", () => {
      });

   })
}

export default initializeSocket;