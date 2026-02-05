import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
function Root(){
  useEffect(()=>{
    const theme = localStorage.getItem('cs_theme') || 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },[])
  return (<BrowserRouter><App /></BrowserRouter>)
}
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Root /></React.StrictMode>)
