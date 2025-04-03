import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Hp1")
        console.log("db is connected")
    } catch (error) {
        console.log("db m h error", error)
    }
}





export default connectDB