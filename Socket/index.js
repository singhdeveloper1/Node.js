import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import {Server} from "socket.io"
import http from "http"
import connectdb from "./db.js";
import Message from "./model/message.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

connectdb()

const server = http.createServer(app)
const io = new Server(server)

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + "/index.html")
// })
app.use(express.static(__dirname));

// let  id = 1


io.on("connection", async(socket)=>{

    const message = await Message.find()
    // console.log(message)

    // console.log(message)
    // message.map(item=>(
    //     console.log(item.user),
    //     console.log(item.message)
    // ))

    socket.emit("old message", message)


    // socket.emit("id", id++)

    // console.log('a user connected')
    socket.on("chat message",async (data)=>{
        // console.log(`${data.user}  : ${data.message}`)

      const record =   Message({
        user:  data.user,
        message : data.message

    })
    await record.save()

        // socket.broadcast.emit("chat message" , data)
        io.emit("chat message" , data)
    })
    // socket.on("disconnect",()=>{
    //     console.log("user disconnected")
    // })
})

server.listen(2000,()=>{
    console.log("server is running at 2000")
})