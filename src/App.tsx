import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProtectedRoute from './lib/utils/ProtectedRoute'
import Notifications from './pages/Notifications'
import Login from './pages/Login'
import Registere from './pages/Register'
import Layout from './lib/layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/invite/:id' element={<Registere />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home/>} />
            <Route path='/notifications' element={<Notifications/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
