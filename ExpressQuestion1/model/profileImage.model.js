import mongoose, { Schema } from "mongoose";

const profileImageSchema = new mongoose.Schema({

    user_id : {
        type : Schema.Types.ObjectId,
        red : "User"
    },

    imageUrl : {
        type : String,
        default : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg"
    }
})

const ProfileImage = mongoose.model("ProfileImage", profileImageSchema)

export default ProfileImage