import express from "express"
import User from "../model/users.model.js"
import UserProfile from "../model/usersProfile.model.js"

// const RandomData = [
//     {
//         firstname : "first1",
//         lastname : "last1",
//         email : "first1@gmail.com",
//         password : "1234",
//         dob : "23-06-2001",
//         mobile : 1234
//     },

//     {
//         firstname : "first1",
//         lastname : "last1",
//         email : "first1@gmail.com",
//         password : "1234",
//         dob : "23-06-2001",
//         mobile : 1234
//     },

//     {
//         firstname : "first1",
//         lastname : "last1",
//         email : "first1@gmail.com",
//         password : "1234",
//         dob : "23-06-2001",
//         mobile : 1234
//     }
// ]

 const Router  = express.Router()

 Router.post("/createUser", async (req , res)=>{
    const {firstname, lastname, email, password} = req.body



    const hashPassword = await User.hashedPassword(password)

    const newUser = new User({
        firstname,
        lastname,
        password : hashPassword ,
        email

    })
    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log("user m h error", error)
    }

 })
 Router.post("/createUserProfile" , async (req , res)=>{
    const {dob , mobile} = req.body

    const profile = new UserProfile({
        dob,
        mobile
    })
    try {
        await profile.save()
        res.status(200).json(profile)
    } catch (error) {
        console.log("profile m h error", error)
    } 
 })


 export default Router