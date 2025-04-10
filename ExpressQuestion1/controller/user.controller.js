import Address from "../model/address.model.js"
import Token from "../model/token.model.js"
import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import ProfileImage from "../model/profileImage.model.js"
import sendMail from "../MailSender/mailSender.js"

export const registerUser = async (req, res)=>{
    const {username, password, confirmPassword, email, firstname, lastname} = req.body

    const newUser = new User({
        username,
        password,
        confirmPassword,
        email,
        firstname,
        lastname
    })

    try {
        await newUser.save()

        await sendMail(email, "welcome..." ,  `hello ${username } how are you... thanks for registering`)

 
        res.status(200).json(newUser)
    } catch (error) {
        console.log("register m h error", error)        
    }
}

//! login

export const loginUser = async(req, res)=>{
    const {username, password} = req.body

    try {
        const user = await User.findOne({username})
    
        if(!user) return res.status(401).json({msg : "invalid user"})

            const match = await user.comparePassword(password)

            if(!match) return res.status(401).json({msg : "invalid user"})
    
            const token = await user.generateToken()        



        //! to adding token in Token model 
            const newToken = new Token({
                user_id : user._id,
               access_token :  token
            })
            await  newToken.save()



            res.cookie("token", token)

            res.status(200).json({user, token})        



    } catch (error) {
        console.log("login me h error", error)
    }

}

//! get

export const getUser = async(req, res)=>{

    const id  = req.user._id

    // const address = await Address.findOne({user_id : id})
    const address = await Address.find({user_id : {$in : id}})
    const image = await ProfileImage.findOne({user_id : id})
  
    if(address && address.length > 0 &&  image){
    res.status(200).json({user : req.user , Profile_Picture : image.imageUrl , address : address})
    }
    else if(image){
        res.status(200).json({user : req.user , Profile_Picture : image.imageUrl})
        }

    else if(address.length > 0){
        res.status(200).json({user : req.user, address : address})
    }
   
    else{
        res.status(200).json(req.user)
    }
    
}

//! deleteUser

export const deleteUser = async (req, res) =>{    

    try {
        res.clearCookie("token")

        const id = req.user._id
     
        await User.findByIdAndDelete(id)        

        res.status(200).json({msg : "deleted"})

    } catch (error) {
        console.log("delete user m h error", error)
    }

        
}

export const getLimitedUser = async(req, res)=>{
    try {
        const number = req.params.page *10
       

       
            
            const user =  await User.find().skip(number - 10).limit(10)
            res.status(200).json(user)
       


    } catch (error) {
        console.log("get limited user m h error", error)
    }
}

//! address

export const userAddress  = async (req, res)=>{

    const {address, city, state, pinCode, phone} = req.body

    const user_id = req.user._id 
    // console.log(user_id)

    const newAddress = new Address({
        user_id,
        address,
        state,
        city,
        pinCode,
        phone
    })

    try {
        await newAddress.save()
        res.status(200).json(newAddress)
    } catch (error) {
        console.log("address m h error", error)
    }
}

//! delete Address

export const deleteAddress = async (req, res)=>{

    try {
        const ids = req.query.ids

        if(ids.lenght ==0) return res.status(401).json({msg : "provide id to delete addresses"}) 
    
        const id = typeof ids === "string" ?  ids.split(",") : []
        console.log(id)

        await Address.deleteMany({_id : {$in : id}})

        res.status(200).json({msg : "deleted"})
        
    } catch (error) {
        console.log("delete address m h error", error)
    }


}

//! forgot password token

export const passwordToken = async (req, res)=>{

    try {
        const passwordToken = jwt.sign({id : req.user._id}, process.env.KEY, {expiresIn : "15m"})

        res.cookie('passwordToken', passwordToken)

        const link = "http://localhost:1000/user/verify-reset-password"
        const message =`hello ${req.user.username}  this is the link for reset password \n ${link}  \n this link is only valid for 14 min...`

        await sendMail(req.user.email, "your reset password link" , message  )

        res.status(200).json(passwordToken)

       
    } catch (error) {
        console.log("password token m h error", error)
        
    }

}

//! update password

export const updatePassword = async (req, res)=>{
    const {password} = req.body

    // const passwordToken = req.cookies.passwordToken || req.headers.authorization && req.headers.authorization.split(" ")[1]
    // res.clearCookie("passwordToken")

    try {
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const updatedPasswrod = await User.findByIdAndUpdate(req.user._id,{
        password : hashedPassword
    }, {new : true})

  await sendMail(req.user.email, "informing", "password updated successfully")

    res.status(200).json({msg :"password updated successfully",updated :  updatedPasswrod})

       
    } catch (error) {
        console.log("update password m h error", error)
    }
}