import express from "express"
import { env } from "./config/env.service.js";
import authRouter from"./module/auth/auth.controller.js"
import { databaseConnection } from "./database/connection.js";






const app=express()

app.use(express.json())
app.use("/auth",authRouter)
databaseConnection()


app.use((err,req,res,next)=>{
console.log(err);
let stack=env.Mood=="dev"?err.stack:null
const status=err.cause?err.cause.status:500
const extra=err.cause?err.cause.extra:null
res.status(status).json({message:err.message,stack,extra})
})






app.listen(env.port,()=>{
    console.log("server is runing");
    
})