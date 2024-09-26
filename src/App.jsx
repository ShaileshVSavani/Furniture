import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavaBar from './components/NavaBar'
import AllRoutes from './routes/AllRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavaBar />
      <AllRoutes/>
    </>
  )
}

export default App
