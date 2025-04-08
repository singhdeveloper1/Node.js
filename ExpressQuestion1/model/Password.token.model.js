import mongoose from "mongoose";

const passwordTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true
    },

    expiry : {
        type: Date,
        default : Date.now(),
        expires : 600
    }
})

const  PasswordToken = mongoose.model("PasswordToken", passwordTokenSchema)

export default PasswordToken