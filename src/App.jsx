import { useState } from 'react'
import './App.css'
import WhatsappIcon from './components/WhatsappIcon'
import QrChecker from './components/QrChecker'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <QrChecker />
      <WhatsappIcon />
    </>
  )
}

export default App
