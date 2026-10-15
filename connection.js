import mongoose from "mongoose"
import { env } from "../config/env.service.js"


export const databaseConnection=()=>{
    mongoose.connect(env.DATABASE_URI).then(()=>{
        console.log("DATABASE CONNECTED");
    }).catch((err)=>{
        console.log(err);
        
    })
}