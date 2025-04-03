import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },

    lastname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : [true, "emil is already exist"]
    },

    password : {
        type : String,
        required : true
    }
},{timestamps : true})

userSchema.methods.hashedPassword = function(password){
    return bcrypt.hashSync(password , 10)
}

const User = mongoose.model("User", userSchema)

export default User

