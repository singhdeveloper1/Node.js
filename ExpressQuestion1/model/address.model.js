import mongoose, { Schema } from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id : { 
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    address : {
        type : String,
        required : true
    },

    city : {
        type : String,
        required : true
    },

    state : {
        type : String,
        required : true
    },

    pinCode : {
        type : String,
        required : true
    },

    phone : {
        type : Number,
        required : true,
    }
},{timestamps : true})

const Address = mongoose.model("Address", addressSchema)

export default Address