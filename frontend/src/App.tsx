import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import RouteComponent from './RouteComponent'
import Login from './Login'
import { useUserContext } from './hooks/useUserContext'
import { IconLogout } from '@tabler/icons-react'

function App() {
  const { user, logout } = useUserContext()

  const onLogout = () => {
    localStorage.removeItem('loadersUser')
    logout()
  }

  return (
    <BrowserRouter basename="/load/">
      <Routes>
        <Route path='*' element={
          <div id='page'>
            <div id='header'>
              <Link to={'/'} className='header-link'>Маршруты</Link>
              {user ?
                <IconLogout className="header-icon" stroke={2} size={30} onClick={onLogout}/>
              :
                <Link to='/login' className='header-link'>Войти</Link>
              }
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

