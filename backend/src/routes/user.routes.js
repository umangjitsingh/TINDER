import express from "express";
import {registerController, loginController, logoutController, getMeController} from "../controllers/user.controllers.js";
import authM from "../middlewares/AuthM.js";


const userRouter=express.Router();

userRouter.post("/register", registerController)
userRouter.post("/login", loginController)
userRouter.get("/logout",authM,logoutController)
userRouter.get("/me", authM, getMeController)


export default userRouter;