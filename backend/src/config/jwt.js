import dotenv from "dotenv"


dotenv.config()
import jwt from "jsonwebtoken"


export const generateToken = (UserId) => {
   return jwt.sign({id: UserId}, process.env.JWT_SECRET, {expiresIn: "10d"})
};

export const verifyToken = (token) => {
   return jwt.verify(token, process.env.JWT_SECRET)
}