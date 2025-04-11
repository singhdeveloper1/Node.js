import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    
    message : {
        type : String,
        required : true
    },

    expiry :{
        type : Date,
        default : Date.now,
        expires : 300
    } 
})


const Message = mongoose.model("Message", messageSchema)

export default Message