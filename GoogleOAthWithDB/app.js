import express from "express"
import session from "express-session"
import passport from "./passport.js"
import router from "./routes/google.route.js"
import cors from "cors"

const app = express()

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(session({
    secret : process.env.SECRET,
    saveUninitialized : false,
    resave : false,
    cookie: {
        httpOnly: true,
        secure: false, // set to true only in production with HTTPS
        sameSite: "lax" // OR "none" if using HTTPS
      }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", router)


export default app