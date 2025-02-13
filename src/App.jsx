import React from 'react'
import './App.css'
import Form from './components/Form'
import NavBar from './components/NavBar'

function App() {
  
  return (
    <div className='h-[100vh] flex flex-col items-center'>
      <div className='bg-white w-full'>
        <NavBar/>
      </div>
      <div className='w-full'>
        <Form />
      </div>
    </div>
  )
}

export default App
