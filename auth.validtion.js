import z from "zod"



  export const userloginschema=z.strictObject({
        email:z.string().email(),
        password:z.string()
    })