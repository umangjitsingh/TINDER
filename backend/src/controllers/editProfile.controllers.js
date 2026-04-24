import User from "../models/user.model.js"
import {uploadImageOnCloudinary} from "../services/cloudinary.service.js";
import {sendMailToUser} from "../services/nodemailer.js";
import randomCodeGenerator from "../config/randomCodeGenerator.js";
import bcrypt from "bcrypt";


export const editProfile = async (req, res) => {

   try {
      const loggedInUser = req.user;

      if (!loggedInUser) {
         return res.status(404).json({message: "User not found. Please login."});
      }


      const {age, gender, skills, about} = req.body;

      let photoUrl = loggedInUser.photoUrl;

      if (req.file) {
         const {buffer, mimetype} = req.file;
         const base64String = buffer.toString('base64');
         const dataUri = `data:${mimetype};base64,${base64String}`;
         photoUrl = await uploadImageOnCloudinary(dataUri);
      }

      const editedUser = await User.findOneAndUpdate({_id: loggedInUser._id}, {
         age, gender, skills, about,
         photoUrl
      }, {returnDocument: "after", runValidators: true});


      return res.status(200).json({
         message: "Profile updated successfully", editedUser
      });
   } catch (e) {
      return res.status(500).json({message: `Error updating profile: ${e.message}`});
   }

}


export const forgetPassword = async (req, res) => {
   try {
      const { email } = req.body;

      if (!email) {
         return res.status(400).json({ message: "Please enter your email" });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "User not found" });
      }

      const code = randomCodeGenerator();

      // Save code + expiry in DB
      user.resetPasswordCode = code;
      user.resetPasswordCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
      await user.save();

      await sendMailToUser({
         to: user.email,
         subject: "Verify your Email",
         html: `<h1>Verify your Email</h1>
         <p>You can use this token: <code>${code}</code></p>`
      });

      return res.status(200).json({
         message: "Verification code sent to your email",
         code // keep only for testing
      });

   } catch (e) {
      console.error("Error in forgetPassword:", e);
      return res.status(500).json({ message: "Something went wrong" });
   }
};

export const resetPassword = async (req, res) => {
   try {
      const { newPassword } = req.body;

      const user=req.user;

      const hashedPassword = await bcrypt.hash(newPassword, 8);
      const updatedUser=await User.findOneAndUpdate({_id: user._id},
         {password: hashedPassword},
         {returnDocument: "after"});


      return res.status(200).json(
         { message: "Password reset successful", updatedUser });

   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Server error" });
   }
};
