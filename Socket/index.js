import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import {Server} from "socket.io"
import http from "http"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

const server = http.createServer(app)
const io = new Server(server)

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + "/index.html")
// })
app.use(express.static(__dirname));

io.on("connection", (socket)=>{
    // console.log('a user connected')
    socket.on("chat message", (data)=>{
        console.log(`${data.user}  : ${data.msg}`)
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