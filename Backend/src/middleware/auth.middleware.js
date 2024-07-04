import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"


export const verifyJWT = asyncHandler(async(req,res,next)=>{

  console.log(req.cookies);
  
    try {
      //get token
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
      if(!token){
        throw new ApiError(401,"Unauthorized")
      }

      //verify token
      const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

      //check if user exists
      const user = await User.findById(decoded.id).select("-password -refreshToken");

      if(!user){
        throw new ApiError(401,"User not found")
      }

      req.user = user;

      next();
    } catch (error) {
      throw new ApiError(401,"Error while authorization")
    }
})