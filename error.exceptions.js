import { env } from "../../config/env.service.js";




export const ErrorRespones=({
    status=400,
    message="something went wrong",
     extra=undefined
} ={} )=>{
 throw new Error(message,{cause:{status,extra}});
}

export const BadRequestEception=({message="Bad Request",extra=undefined}={})=>{
    return ErrorRespones({status:400,message:message,extra:extra})
}

export const NotFoundException=({message="Not found error",extra=undefined}={})=>{
    return ErrorRespones({status:404,message,extra})
}

export const ConflictException=({message="conflict error",extra=undefined}={})=>{
    return ErrorRespones({status:409,message,extra})
}
export const UnAuthorizedException=({message="UnAuthorized error",extra=undefined}={})=>{
    return ErrorRespones({status:401,message,extra})
}
export const ForbiddenException=({message="Forbidden error",extra=undefined}={})=>{
    return ErrorRespones({status:403,message,extra})
}
export const globalhandlingerror=(err,req,res,next)=>{
    const Mood=env.Mood=="dev"
    const status=err.status ? err.status:err.cause ?err.cause.status:500
    const deafultmessage="something went wrong"
    const displayerrormessage=err.message||deafultmessage
    res.status(status).json({
        stack:Mood ? err.stack:null,
        message:Mood ? displayerrormessage:deafultmessage,
        extra:Mood ?err.cause:null
    })
}