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

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})