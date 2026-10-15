import { BadRequestEception, ConflictException, NotFoundException } from "../../common/exciptions/error.exceptions.js"
import { sendEmail } from "../../common/middleware/send.email.js"
import { comparehash, genratehash } from "../../common/services/encrption.js"
import { generatenewAccesstoken, generatetoken } from "../../common/services/token.service.js"
import { userModel } from "../../database/model/user.model.js"
import jwt from "jsonwebtoken"







export const signup=async(body)=>{
let{username,email,password,age,confirmpassword}=body
if (password!=confirmpassword) {
    return BadRequestEception({message:"password and confiarmpassword not match"})
}
let exsistedmail=await userModel.findOne({email})
if (exsistedmail) {
    return ConflictException({message:"email already exits"})
}else{
    let hashpassword=await genratehash({plaintext:password})
    console.log(hashpassword);
    if (hashpassword) {
        let otp=Math.round(Math.random()*100000)
      let user=await userModel.create({username,email,password:hashpassword,age,otp})
      sendEmail({to:email,subject:"sign up",html:'<h1> your otp is 123456 </h1>'})
    return({massage:"user Create",data:user})   
    }
}}
export const login=async(body)=>{
    let {email,password}=body
    let userdata= await userModel.findOne({email})
    if(!userdata){
    return NotFoundException({message:"user not found"})
    }
   let Matched =  await comparehash({plaintext:password,hashedtext:userdata.password})
    if (Matched) {
         const {accesstoken,refreshtoken}= generatetoken(userdata)
        return ({message:"login success",accesstoken,refreshtoken})
    }else{
        return BadRequestEception({message:"password not match",extra:"token"})
        }
}
export const getalluser=async (id)=>{
    let userdata=await userModel.findById(id)
    return userdata
}
export const generateaccesstoken=(body)=>{
let{refreshtoken}=body
let{accesstoken}=generatenewAccesstoken(refreshtoken)
if(accesstoken){
return {accesstoken}
}else{
    throw  BadRequestEception("invalud token")
}

}