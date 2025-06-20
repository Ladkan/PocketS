import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProtectedRoute from './lib/utils/ProtectedRoute'
import Notifications from './pages/Notifications'
import Login from './pages/Login'
import Registere from './pages/Register'
import Layout from './lib/layout'
import User from './pages/User'
import { useDispatch } from 'react-redux'
import { pb } from './lib/pb'
import { fetchNotifications } from './lib/store/slices/notification.slice'

function App() {

  const dispatch = useDispatch()

  pb.collection("notifications").subscribe('*', function (e) {
    if(e.action === 'create'){
      //@ts-expect-error
      dispatch(fetchNotifications(pb.authStore.record.id))
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/invite/:id' element={<Registere />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home/>} />
            <Route path='/notifications' element={<Notifications/>} />
            <Route path='/user' element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
