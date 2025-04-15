import "dotenv/config"
import express from "express"
import session from "express-session"
import passport from "./passport.js"


const app = express()

app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())


app.get("/", (req, res)=>{
    res.send(`<h1>Home</h1>`)
})

//! Start google auth
app.get("/auth/google", passport.authenticate("google", {scope :["profile", "email"]}))

//! handle callback
app.get("/auth/google/callback", passport.authenticate("google", {failureRedirect : "/", successRedirect : "/profile"}))

//! show profile
app.get("/profile", (req, res)=>{
    res.send(`
        <h1>Profile</h1>
        <pre>${JSON.stringify(req.user,null,2)}</pre>
        <a href="/logout">Logout</a>
        `)
})

//! logout
app.get("/logout", (Req, res)=>{
    res.redirect("/")
})




const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})