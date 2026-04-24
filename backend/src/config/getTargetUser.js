import UserModel from "../models/user.model.js";


const getTargetUser = async (id)=>{
   const user= await UserModel.findById(id).select("photoUrl firstName lastName");
   return user;
}
export default getTargetUser;