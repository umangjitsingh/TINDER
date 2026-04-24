import { io } from "socket.io-client";
import {BACKEND_URL} from "./BACKEND_URL.js";

const createSocketConnection=()=>{
   return io(BACKEND_URL,{
      withCredentials:true
   })
}
export default createSocketConnection;