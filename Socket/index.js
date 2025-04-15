import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import {Server} from "socket.io"
import http from "http"
import connectdb from "./db.js";
import Message from "./model/message.model.js";
import cors from  "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

connectdb()

const server = http.createServer(app)
const io = new Server(server,{
    cors :{
        origin : "http://localhost:5173",
        methods : ["GET", "POST"]
    }
})

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + "/index.html")
// })
app.use(cors())
app.use(express.static(__dirname));

io.on("connection", async(socket)=>{

    const message = await Message.find()
    socket.emit("old message", message)

    socket.on("chat message",async (data)=>{

      const record =   Message({
        user:  data.user,
        message : data.message

    })
    await record.save()

        // socket.broadcast.emit("chat message" , data)
        io.emit("chat message" , data)

    })
                
            //! sending updated message
        socket.on("update message",async (data)=>{
            const updatedData = await Message.findByIdAndUpdate(data.id,{
                message : data.message
            },{new : true})

            io.emit("update message", updatedData)
        })

            
    // socket.on("disconnect",()=>{
    //     console.log("user disconnected")
    // })
})

server.listen(2000,()=>{
    console.log("server is running at 2000")
})