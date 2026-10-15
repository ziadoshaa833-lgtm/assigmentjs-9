 import jwt from "jsonwebtoken"
import { env } from "../../config/env.service.js";




export const generatetoken=(user)=>{
   let aud;
   let signture;
   let refreshsignture;
   switch (user.role) {
      case "1":
         signture=env.adminignture,
         aud="admin",
         refreshsignture=env.adminRefreshsignture
         break;
      default:
      signture=env.usersignture,
      aud="user",
      refreshsignture=env.userRefreshsignture
      break;
   }
   let accesstoken=jwt.sign({id:user._id},signture,{expiresIn:"30min",audience:aud})
   let refreshtoken=jwt.sign({id:user._id},refreshsignture,{expiresIn:"1y",audience:aud})
   return {accesstoken,refreshtoken}
   
   }
   export const generatenewAccesstoken=(refreshtoken)=>{
      let data=jwt.decode(refreshtoken)
   let signture;
   let aud;
   let refreshsignture;
   switch (data.aud) {
      case "admin":
         signture=env.adminignture,
         aud="admin",
         refreshsignture=env.adminRefreshsignture
         break;
      default:
      signture=env.usersignture,
      aud="user",
      refreshsignture=env.userRefreshsignture
      break;
   }
   let decodeRefreshtoken=jwt.verify(refreshtoken,refreshsignture)
   let accesstoken=jwt.sign({id:decodeRefreshtoken.id},signture,{expiresIn:"30min",audience:aud})

   return {accesstoken}
   
   }

