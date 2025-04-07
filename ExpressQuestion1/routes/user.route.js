import express from "express"
import { deleteAddress, deleteUser, getLimitedUser, getUser, loginUser, passwordToken, registerUser, updatePassword, userAddress } from "../controller/user.controller.js"
import { authentication } from "../middleware/auth.middleware.js"
import { passwordAuthentication } from "../middleware/password.authentication.js"

const router = express.Router()

router.post("/register",registerUser )
router.post("/login", loginUser)
router.get("/get", authentication, getUser)
router.delete("/delete", authentication, deleteUser)
router.get("/list/:page", getLimitedUser)
router.post("/address", authentication, userAddress )
router.delete("/delete/address", authentication, deleteAddress)
router.post("/forgot-password", authentication, passwordToken)
router.put("/verify-reset-password", passwordAuthentication, updatePassword)

export default router 