import User from "../model/users.model.js"
import UserProfile from "../model/usersProfile.model.js"

const RandomData = [
    {
        firstname : "first1",
        lastname : "last1",
        email : "first5@gmail.com",
        password : "1234",
        dob : "1995-06-23T12:30:00Z",
        mobile : 1234
    },

    {
        firstname : "first1",
        lastname : "last1",
        email : "first2@gmail.com",
        password : "1234",
        dob : "1999-06-23T12:30:00Z",
        mobile : 1234
    },

    {
        firstname : "first1",
        lastname : "last1",
        email : "first3@gmail.com",
        password : "1234",
        dob :"2001-06-23T12:30:00Z",
        mobile : 1234
    }
]

let insert = async ()=>{
    for(let data of RandomData){
        data.password = await User.hashedPassword(data.password)        

        const newUser = new User({
            firstname : data.firstname,
            lastname : data.lastname,
            email : data.email,
            password : data.password
        })

        try {
            await newUser.save()
        } catch (error) {
            console.log("user m h error", error)
        }
        const profile = new UserProfile({
            userId : newUser._id,
            dob : data.dob,
            mobile : data.mobile
        })
        try {
            await profile.save()        
        } catch (error) {
            console.log("profile m h error", error)
        }
    }

}

export default insert