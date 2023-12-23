import {Schema, model} from "mongoose"

const userSchema = new Schema ({
    nombre: String,
    userType: String,
    email: {
        type: String,
        unique: true
    } ,
    password : String
})
export const userModel = model('users',userSchema);