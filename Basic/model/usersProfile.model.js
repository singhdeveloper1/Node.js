import mongoose, { Schema } from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userId :{
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    dob : {
        type : Date,
        required : true
    },

    mobile : {
        type : Number,
        required : true
    }
},{timestamps : true})

const UserProfile = mongoose.model("UserProfile" , userProfileSchema)

export default UserProfile