import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import RouteComponent from './RouteComponent'

function App() {

  return (
    <BrowserRouter basename="/load/">
      <div id='page'>
        <div id='header'>
          <Link to={'/'} className='header-link'>Маршруты</Link>
        </div>
        <div id='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/route/:id' element={<RouteComponent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

