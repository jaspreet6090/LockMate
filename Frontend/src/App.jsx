import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Form, Password } from './components'
import 'react-toastify/dist/ReactToastify.css';






const App = () => {

  // console.log(import.meta.env.VITE_SERVER);  

  return (
    <>
      <Form />
      <Password  />

      <div className="h-[1000px]">wdw</div>
    </>
  )
}

export default App
