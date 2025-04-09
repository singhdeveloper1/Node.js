import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination : (req, file , cb) =>{
        cb(null , "public/uploads/")
    },

    filename : (req, file, cb)=>{
        // const uniqueName = `${Date.now()} - ${file.originalname}`
        const uniqueName = ` ${file.originalname}`
        cb(null, uniqueName)
    }
})

const uploadLocal = multer({storage})

export default uploadLocal