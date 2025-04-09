import express from "express"
import cors from "cors"
import router from "./routes/user.route.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))

app.use("/user", router)

export default app