import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import {generateToken, verifyToken} from "../config/jwt.js";
import blacklistedToken from "../models/blacklistedToken.model.js";


const COOKIE_OPTIONS = {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   sameSite: "strict",
   maxAge: 10 * 24 * 60 * 60 * 1000,
   path: "/",
};

export const registerController = async (req, res) => {
   try {
      const {
         firstName, lastName, email, password
      } = req.body;

      if (!firstName || !lastName || !email || !password) return res.status(400).json({message: "Please fill in all fields"});

      const userAlreadyPresent = await User.findOne({email});
      if (userAlreadyPresent) return res.status(400).json({message: "User already present"});

      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
         firstName, lastName, email,
         password: hashedPassword
      });

      const safeUser= await User.findById(user._id).select("-password")

      const token = generateToken(user._id);
      res.cookie("token", token, COOKIE_OPTIONS);

      return res.status(201).json({
         message: "User created successfully", safeUser
      });

   } catch (e) {
      return res.status(500).json({
         message: `Error on server side while registering :${e}`
      })
   }
}

export const loginController = async (req, res) => {
   try {
      const { option, password } = req.body;

      if (!option || !password) {
         return res.status(400).json({ message: "Please provide email/fullname and password" });
      }

      let user;

      // Login using email
      if (option.includes("@")) {
         user = await User.findOne({ email: option }).select("+password");
      }
      // Login using full name
      else {
         const [firstName, lastName] = option.split(" ");
         if (!firstName || !lastName) {
            return res.status(400).json({ message: "Please provide full name as 'First Last'" });
         }

         user = await User.findOne({ firstName, lastName }).select("+password");
      }

      if (!user) {
         return res.status(400).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user._id);
      console.log("token-->",token)
      res.cookie("token", token, COOKIE_OPTIONS);

      return res.status(200).json({ message: "Login successfully" });

   } catch (e) {
      return res.status(500).json({ message: `Login error: ${e.message}` });
   }
};


export async function logoutController(req, res) {
   try {
    const token =req.cookies.token;

    await blacklistedToken.create({token});

    res.clearCookie("token");
    return res.status(200).json({message: "Logout successful"});

   } catch (e) {
      return res.status(500).json({message: `Logout error: ${e.message}`});
   }
}

export async function getMeController(req, res) {
   try {
      const user = req.user;
      console.log("user",user)
      return res.status(200).json({user});

   } catch (err) {
      return res.status(400).json({
         message: `Sorry, you are not found. ${err.message}`
      })
   }
}