import express from "express";
import {pendingConnectionRequests, receivedRequest, userConnections,core,sendRequest} from "../controllers/connection.controller.js";
import AuthM from "../middlewares/AuthM.js";

const connectionRouter=express.Router();

connectionRouter.post('/request/send/:status/:receiverId',AuthM,sendRequest);
connectionRouter.post("/request/review/:status/:requestId",AuthM,receivedRequest);


// connnection->>friends routes
connectionRouter.get('/pending-requests',AuthM,pendingConnectionRequests)
connectionRouter.get('/friend-list',AuthM,userConnections);

// core whom i can add
connectionRouter.get('/core',AuthM,core);


export default connectionRouter;