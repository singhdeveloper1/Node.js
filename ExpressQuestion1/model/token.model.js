import mongoose, { Schema } from "mongoose"

const tokenSchema = new mongoose.Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    access_token : {
        type : String,
        required : true
    },

    expiry : {
        type : Date,
        default : Date.now,
        expires : 3600 // 1 hr in sec
    }
})

const Token = mongoose.model("Token", tokenSchema)

export default Token