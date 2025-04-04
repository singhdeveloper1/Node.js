import express from "express"
import { deleteUser, getLimitedUser, getUser, loginUser, registerUser } from "../controller/user.controller.js"
import { authentication } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",registerUser )
router.post("/login", loginUser)
router.get("/get", authentication, getUser)
router.delete("/delete", authentication, deleteUser)
router.get("/list/:page", getLimitedUser)

export default router 