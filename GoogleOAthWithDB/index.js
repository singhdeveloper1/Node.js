import "dotenv/config"
import app from "./app.js";
import connectDB from "./db.js";

connectDB()
const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})


