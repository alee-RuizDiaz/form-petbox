import React, {useState} from 'react'
import './App.css'
import Form from './components/Form'
import NavBar from './components/NavBar'

function App() {
  
  return (
    <div className='h-[100vh] flex flex-col items-center'>
      <div className='bg-[#FBF8E9] w-full'>
        <NavBar/>
      </div>
      <div className='flex-grow flex justify-center items-start pt-[50px]'>
        <Form />
      </div>
    </div>
  )
}

export default App
