 import jwt from "jsonwebtoken"
import { env } from "../../config/env.service.js"
import { BadRequestEception } from "../exciptions/error.exceptions.js"


 

export const auth=(req,res,next)=>{
   let[flag,token]=req.headers.authorization.split(" ")
   switch (flag) {
    case "Basic":
        const Basicdata=Buffer.from(token,"base64").toString()
        let[email,password]=Basicdata.split(":")
        console.log({email,password});
        break;
        case "Bearer":
            let decoded=jwt.decode(token)
            let signture;
            switch (decoded.aud) {
                case "admin":
                    signture=env.adminignture
                    break;
                case "user":
                    signture=env.usersignture    
                    break;
            }
            let decodeddata=jwt.verify(token,signture)
            if(decodeddata){
                req.user=decodeddata
             next()
            }else{
                throw BadRequestEception({message:"invalid token"})
            }
            default:

        }
        
    }
    
