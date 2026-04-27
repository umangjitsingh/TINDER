import express from "express";
import {chatController} from "../controllers/chatController.js";
import AuthM from "../middlewares/AuthM.js";


 const chatRouter=express.Router();

chatRouter.get('/chat/:targetUserId',AuthM,chatController);

export default chatRouter