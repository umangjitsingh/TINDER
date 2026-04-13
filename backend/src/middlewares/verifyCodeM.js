import User from "../models/user.model.js";


export const verifyCodeM=async (req,res,next)=>{
   try {

      const { email, code } = req.body;

      const user = await User.findOne({
         email,
         resetPasswordCode: code,
         resetPasswordCodeExpiry: { $gt: Date.now() }
      });

      if (!user) {
         return res.status(400).json({ message: "Invalid or expired code" });
      }
      req.user=user;
      next();

   } catch (e) {
      return res.status(500).json({message: `Error verifying code: ${e.message}`});
   }
}