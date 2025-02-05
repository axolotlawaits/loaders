import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import TruckRoute from './TruckRoute'

function App() {


  return (
    <BrowserRouter basename="/load/">
      <div id='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/route/:id' element={<TruckRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
