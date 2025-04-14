import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client"
import './App.css'

const Chat = () => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [username, setUserName] = useState("")
    const [button, setButton] = useState(true)
    // const [id, setId] = useState("")

    const idRef = useRef(null)
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

        socketRef.current.on("update message", (updatedMessage)=>{
            setMessages(prev=>(
                prev.map(message=>(
                    message._id === updatedMessage._id ? updatedMessage : message
                ))
            ))
        })

        return ()=>{
            socketRef.current.disconnect()
        }
        

    },[])

    const handleSend = (e)=>{
        

        if(!username) return alert("refresh to enter username")

            else if(input){
                socketRef.current.emit("chat message", {
                    user : username,
                    message : input
                })
            }
            setInput("")
    }

    const handleEditMessage = (message)=>{
        setButton(false)
        setInput(message.message)
        // setId(message._id)
        idRef.current = message._id
        // socketRef.current.emit("edit message",message)
    }


    const handleUpdate = () =>{
       console.log(input)
    //    console.log(id)
        socketRef.current.emit("update message", {
            id : idRef.current,
            message : input
        })

        // socketRef.current.on("chat message", data=>{
        //     console.log("update" ,data)
        // })

        setInput("")
        setButton(true)
        
    }

  return (
    <div>
      <form onSubmit={(e)=>e.preventDefault()} id='form'>
        <input type='text' value={input} onChange={(e)=>setInput(e.target.value)} id='input' />
        
        {

            button ?<button onClick={handleSend}>Send</button> : <button onClick={handleUpdate}>Update</button>
        }
      </form>

      <ul id='messages'>
       {
        messages.map((message, index)=>(

            <li key={index}>
                
                 {
                    
                message.user === username ? `You : ${message.message}` : `${message.user} : ${message.message}`
            }
            {
                message.user === username ? <span onClick={()=>handleEditMessage(message)}>edit</span> : ""
            }
            </li>
           
        ))
       }
      </ul>
    </div>
  )
}

export default Chat
