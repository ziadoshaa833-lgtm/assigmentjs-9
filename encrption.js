import bcrypt from "bcrypt"
import {env} from "../../config/env.service.js"



export const genratehash=async ({plaintext,SALT_Rounds=env.SALT_Rounds})=>{
     let hashpassword=await bcrypt.hash(plaintext,Number(SALT_Rounds)) 
    return hashpassword
}
export const comparehash=async ({plaintext,hashedtext})=>{
return await bcrypt.compare(plaintext,hashedtext)
}