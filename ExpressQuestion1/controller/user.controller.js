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
    
            const token = user.generateToken()        

            res.status(200).json({user, token})        



    } catch (error) {
        console.log("login me h error", error)
    }

}