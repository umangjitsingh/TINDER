import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB=async()=>{

   try{
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${connection.connection.host}`);
   }catch (e) {
      console.log("Error connecting to the database", e);
      process.exit(1)
   }
}
