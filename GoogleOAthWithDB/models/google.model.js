import mongoose from "mongoose";

const googleSchema = new mongoose.Schema({
    googleId : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    expiry : {
        type : Date,
        default : Date.now,
        expires : 7200
    }
},{timestamps : true})

const Google = mongoose.model("Google", googleSchema)

export default Google