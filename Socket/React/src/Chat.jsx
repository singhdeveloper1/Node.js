import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client"

const Chat = () => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [username, setUserName] = useState("")
    const socketRef = useRef(null)

    
    useEffect(()=>{
        const user = prompt("Enter Username !!")
        // localStorage.setItem("username", JSON.stringify(user))
        setUserName(user)
        // const socket = io()

        socketRef.current = io("http://localhost:2000")

        //! old message

        socketRef.current.on("old message", data=>{
            setMessages(data)
        })

        //! new messages

        socketRef.current.on("chat message", data=>{
            setMessages(prev=>[
                ...prev,
                data
            ])

          
        })

        return ()=>{
            socketRef.current.disconnect()
        }
        

    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!username) return alert("refresh to enter username")

            else if(input){
                socketRef.current.emit("chat message", {
                    user : username,
                    message : input
                })
            }
            setInput(" ")
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={input} onChange={(e)=>setInput(e.target.value)} />
        
        <button>Send</button>
      </form>

      <ul>
       {
        messages.map((message)=>(

            <li>
                 {
                message.user === username ? `You : ${message.message}` : `${message.user} : ${message.message}`
            }
            </li>
           
        ))
       }
      </ul>
    </div>
  )
}

export default Chat
