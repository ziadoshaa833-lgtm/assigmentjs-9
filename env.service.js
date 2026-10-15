import dotenv from "dotenv"
import path from "path"


dotenv.config({path:path.resolve('./.env')})





const port=process.env.port
const DATABASE_URI=process.env.DATABASE_URI
const SALT_Rounds=process.env.SALT_Rounds
const Mood=process.env.Mood
const usersignture=process.env.ACCESS_SIGNTURE_USER
const userRefreshsignture=process.env.REFRESH_SIGNTURE_USER
const adminignture=process.env.ACCESS_SIGNTURE_ADMIN
const adminRefreshsignture=process.env.REFRESH_SIGNTURE_ADMIN



export const env={
    port,
    DATABASE_URI,
    SALT_Rounds,
    Mood,
    usersignture,
    userRefreshsignture,
    adminignture,
    adminRefreshsignture


}