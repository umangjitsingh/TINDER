import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

import {connectDB} from "./config/db.js";
import userRouter from "./routes/user.routes.js";

const port = process.env.PORT;
const app= express()

app.use(express.json());
app.use(cookieParser())


app.use("/api/user", userRouter)

connectDB().then(() => {
   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   });
});
