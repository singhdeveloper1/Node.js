// import dotenv from "dotenv"
// dotenv.config()
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user : "spriyanshu436@gmail.com",
        pass : process.env.mail_Password
    }
})

const sendMail = async (email, username)=>{
    const mailOptions = {
        from : "spriyanshu436@gmail.com",
        to:email,
        subject : "Welcome...",
        text : `hello ${username } hoe are you... thanks for registering`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("mail send m h error", error)
    }
}

export default sendMail