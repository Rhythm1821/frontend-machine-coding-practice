import { useEffect, useState } from 'react'
import './App.css'
import ProgressBar from './ProgressBar'

function App() {
  const [value,setValue] = useState(0)

  useEffect(()=>{
    setInterval(()=>{
      if (value >= 100) {
        return
      }
      setValue(value=>value+1)
    },1000)
  },[])

  return (
    <>
    <ProgressBar value={value}/>
    </>
  )
}

export default App
