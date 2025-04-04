import express from "express"
import { getUser, loginUser, registerUser } from "../controller/user.controller.js"
import { authentication } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",registerUser )
router.post("/login", loginUser)
router.get("/get", authentication, getUser)

export default router 