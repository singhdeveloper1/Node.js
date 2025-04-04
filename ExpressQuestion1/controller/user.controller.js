import Address from "../model/address.model.js"
import Token from "../model/token.model.js"
import User from "../model/user.model.js"

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

            const match = user.comparePassword(password)

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

    res.status(200).json(req.user)
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
    console.log(user_id)

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