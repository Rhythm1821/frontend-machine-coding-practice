import './App.css'
import useProgressTimer from './hooks/useProgressTimer'
import ProgressBar from './ProgressBar'

function App() {
  const {value} = useProgressTimer({duration: 1000, step: 1, maxValue: 100})
  
  return (
    <>
    <ProgressBar value={value}/>
    </>
  )
}

export default App
