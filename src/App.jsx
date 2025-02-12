import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
  <Header></Header>
  <Outlet></Outlet>
   </>
  )
}

export default App
