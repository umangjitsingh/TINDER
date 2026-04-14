import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

   // Configuration
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
   });



   // Upload an image
  export const uploadImageOnCloudinary = async (imgPath)=>{
      try{
         if(!imgPath) return null;
         const uploadResult = await cloudinary.uploader.upload(imgPath);
         return uploadResult.secure_url;

      }catch (e) {
         console.error(e);
      }

   }