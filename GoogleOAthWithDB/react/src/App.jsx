import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GoogleOAth from './GoogleOAth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <GoogleOAth/>
    </>
  )
}

export default App
