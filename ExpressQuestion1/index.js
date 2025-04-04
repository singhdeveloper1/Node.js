import dotenv from "dotenv"
dotenv.config({
    path : "./.env"
})
import  app  from "./app.js"
import connectDB from "./Database/db.js"


const port = process.env.PORT || 5000

connectDB()

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})