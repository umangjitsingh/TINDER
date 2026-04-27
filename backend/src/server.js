import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import editProfileRouter from "./routes/editProfile.routes.js";
import connectionRouter from "./routes/connection.route.js";
import { FRONTEND_URL  }from "./FRONTEND_URL.js";
import cronJobs from "./services/cronjobs.js";
import  http from 'http';
import initializeSocket from "./services/socket.js";
import chatRouter from "./routes/chat.routes.js";



const port = process.env.PORT;
const app= express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin:FRONTEND_URL,
   credentials: true,
}))

cronJobs();

const appServer=http.createServer(app);

initializeSocket(appServer);

app.use("/user", userRouter);
app.use("/edit", editProfileRouter);
app.use("/connection", connectionRouter);
app.use("/room",chatRouter)

app.use((req, res, next) => {
   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
   res.setHeader('Pragma', 'no-cache');
   res.setHeader('Expires', '0');
   next();
});

connectDB().then(() => {
   appServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   });
});
