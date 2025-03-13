import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import RouteComponent from './RouteComponent'
import Login from './Login'

function App() {

  return (
    <BrowserRouter basename="/load/">
      <Routes>
        <Route path='*' element={
          <div id='page'>
            <div id='header'>
              <Link to={'/'} className='header-link'>Маршруты</Link>
              <Link to={`https://${window.location.host}/emp`} className='header-link'>Домой</Link>
            </div>
            <div id='content'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/route/:id' element={<RouteComponent />} />
              </Routes>
            </div>
          </div>
        }>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

