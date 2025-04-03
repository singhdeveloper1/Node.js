import connectDB from "./db/db.js";
import express from "express"
import Router from "./router/userRouter.js";
import cors from "cors"
import insert from "./router/userRoute2.js";



const app = express()

app.use(cors())
app.use(express.json())


// app.use("/api", Router)
insert()

connectDB().then(()=>{
    app.listen(4000, ()=>{
        console.log("server is running at 4000")
    })
}).catch((err)=>{
    console.log("db m h error", err)
})