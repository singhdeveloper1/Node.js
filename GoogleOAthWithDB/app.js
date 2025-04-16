import express from "express"
import session from "express-session"
import passport from "./passport.js"
import router from "./routes/google.route.js"

const app = express()

app.use(session({
    secret : process.env.SECRET,
    saveUninitialized : false,
    resave : false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", router)


export default app