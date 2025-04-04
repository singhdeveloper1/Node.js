import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"username is required"],
        unique : [true, "username already exist"]
    },

    password : {
        type : String,
        required : [true, "password is required"]
    },

    confirmPassword : {
        type : String,
        required : [true , "confirmed password is required"],
        validate : {
            validator : function (value){
                return value === this.password
            },
            message : "password did not match"
        }
    },

    email : {
        type : String,
        required : true,
        unique : [true, "email already exist"]
    },

    firstname : {
        type : String,
        required : true,
    },

    lastname : {
        type : String,
        required : true
    }
}, {timestamps : true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

        try {
            this.password = await bcrypt.hash(this.password, 10)
            
            this.confirmPassword = undefined

            next()
        } catch (error) {
            next(err)            
        }
})

const User = mongoose.model("User" , userSchema)

export default User