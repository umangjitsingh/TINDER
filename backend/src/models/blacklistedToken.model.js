import mongoose from "mongoose";

const blacklistedTokenSchema=new mongoose.Schema({
   token:{
      type:String,
      required:[true,"token must be added in blacklist"]
   }
},{timestamps:true});

const blacklistedToken=mongoose.model("BlacklistedToken",blacklistedTokenSchema);
export default blacklistedToken;