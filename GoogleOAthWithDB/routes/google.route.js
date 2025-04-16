import express from "express"
import passport from "passport"

const router = express.Router()

router.get("/", (req,res)=>{
    res.send(`<h1>Home</h1>`)
})

router.get("/google", passport.authenticate("google", {scope : ["profile", "email"]}))

router.get("/google/callback", passport.authenticate("google", {failureRedirect : "/", successRedirect : "/auth/profile"}))

router.get("/profile", (req, res)=>{
    // res.send(`
    //     <h1>Data</h1>
    //     <pre>${JSON.stringify(req.user , null, 5)}</pre>
    //     `)

   res.status(200).json(req.user)


})

export default router