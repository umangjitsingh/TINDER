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

const port = process.env.PORT;
const app= express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin:FRONTEND_URL,
   credentials: true,
}))


app.use("/user", userRouter);
app.use("/edit", editProfileRouter);
app.use("/connection", connectionRouter)

connectDB().then(() => {
   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   });
});
