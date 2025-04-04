import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const authentication = async (req, res, next) =>{

    const token = req.cookies.token || req.headers.authorization && req.headers.authorization.split(' ')[1]

    
    if(!token) return res.status(401).json({msg : "unauthorized"})
        try {

            const verify = jwt.verify(token, process.env.KEY)

            const user = await User.findById(verify._id)

            req.user = user
            return next()
        } catch (error) {
            console.log("middleware m h error", error)            
        }
}