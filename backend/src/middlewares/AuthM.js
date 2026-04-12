import {verifyToken} from "../config/jwt.js";
import blacklistedToken from "../models/blacklistedToken.model.js";
import User from"../models/user.model.js"

const authM = async (req, res, next) => {
   try {


      const token = req.cookies.token;

      if (!token) {
         return res.status(401).json({ message: "No token provided" });
      }

      // 1. Verify token first
      const userData = verifyToken(token);
      if (!userData) {
         return res.status(401).json({ message: "Invalid token" });
      }

      // 2. Check blacklist
      const isBlackListed = await blacklistedToken.findOne({ token });
      if (isBlackListed) {
         return res.status(401).json({ message: "Token is blacklisted" });
      }

      // 3. Load user
      const user = await User.findById(userData.id).select("-password");
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();

   } catch (e) {
      return res.status(401).json({
         message: "Invalid token",
         error: e.message
      });
   }
};


export default authM;