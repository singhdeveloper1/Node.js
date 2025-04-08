import dotenv from "dotenv"
dotenv.config()
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name : process.env.cloud_name,
    api_key : process.env.api_key,
    api_secret : process.env.api_secret
})

const uploadAndSendToCloudinary = async (req, res)=>{
    if(!req.file){
        return res.status(400).json({msg : "no file uploaded"})
    }

    const localFilePath = req.file.path

    try {
        const result = await cloudinary.uploader.upload(localFilePath,{
            folder : "profile_images",
        })

        
        fs.unlinkSync(localFilePath)

       

        return res.status(200).json({
            message : "Image uploaded to cloudinary successfully",
            url : result.secure_url,
            public_id : result.public_id
        })
    } catch (error) {
        return res.status(500).json({
            error : "cloudinary upload failed",
            details : error.message
        })
    }
}

export {uploadAndSendToCloudinary}