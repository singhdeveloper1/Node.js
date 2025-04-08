import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
import PasswordToken from "../model/Password.token.model.js"

export const passwordAuthentication = async(req , res, next)=>{

    const passwordToken = req.cookies.passwordToken || req.headers.authorization && req.heeeaders.authorization.split(' ')[1]

   

    if(!passwordToken) return res.status(401).json({msg : "unauthorized user"})

        

        const token = await PasswordToken.findOne({token : passwordToken})

        if(!token){
            const newToken = await PasswordToken({
                token : passwordToken
            })

            await newToken.save()
        }
        else{
            return res.status(401).json({msg : "already changed password" })
        }

        try {
          const verify =  jwt.verify(passwordToken, process.env.KEY)
         


          const user = await User.findById(verify.id)

          req.user = user

            next()
        } catch (error) {
            console.log("password auth m h error", error)
        }
} 