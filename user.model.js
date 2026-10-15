import mongoose, { Schema } from "mongoose"
import { providerenum ,genderenum,roleenum} from "../../common/index.js"
import { string } from "zod"





export const userschema=new Schema({

    username:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:50
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:genderenum,
        default:genderenum.male
    },
    role:{
        type:String,
        enum:roleenum,
        default:roleenum.user
    },
    provider:{
        type:String,
        enum:providerenum,
        default:providerenum.System
    },
    profileimage:{
        type:String
    },
    converimage:{
        type:[String]
    },
    otp:{
        type:String
    },

    isverfied:{
        type:Boolean,
        default:false
    }
},
     { timestamps:true
    
})
export const userModel=mongoose.model("user",userschema)