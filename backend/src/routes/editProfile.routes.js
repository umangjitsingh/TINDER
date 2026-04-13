import express from "express";
import authM from "../middlewares/AuthM.js";
import upload from "../middlewares/multerM.js";
import {forgetPassword, editProfile} from "../controllers/editProfile.controllers.js";
import {resetPassword} from "../controllers/editProfile.controllers.js";
import {verifyCodeM} from "../middlewares/verifyCodeM.js";

const editProfileRouter=express.Router()


editProfileRouter.patch("/profile",authM,upload.single("photoUrl"),editProfile);
editProfileRouter.post("/forget-password",forgetPassword)
editProfileRouter.patch("/reset",verifyCodeM,resetPassword)

export default editProfileRouter;