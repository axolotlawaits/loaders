import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import RouteComponent from './RouteComponent'

function App() {

  return (
    <BrowserRouter basename="/load/">
      <div id='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/route/:id' element={<RouteComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

