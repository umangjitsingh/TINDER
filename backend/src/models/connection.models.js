import mongoose from "mongoose";


const connectionSchema = new mongoose.Schema({
   senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User", required: true
   },
   receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User", required: true
   },
   status: {
      type: String,
      enum: ["like", "pass", "accepted", "rejected"]
   },
},{timestamps:true});

const ConnectionModel=mongoose.model("Connection",connectionSchema);
export default ConnectionModel;