import React, { useEffect, useState } from 'react'
import axios from "axios"

const GoogleOAth = () => {

    const [data, setData] = useState(null)

    useEffect(()=>{
        const res = async ()=>{
            const data = await axios.get(`http://localhost:3000/auth/profile`,{
                withCredentials : true
            })
            setData(data.data)
            console.log(data)
        }
        res()
        
    },[])

    const handleClick = async (e)=>{
        try {
            // const data = await axios.get(`http://localhost:3000/auth/google`)
            // window.location.href = "http://localhost:3000/auth/google"
            window.open("http://localhost:3000/auth/google", "_self")
            
        } catch (error) {
            console.log("get data m h error",  error)
        }
    }
  return (
    <div>
      <button onClick={handleClick}>Login in with Google</button>
    </div>
  )
}

export default GoogleOAth
