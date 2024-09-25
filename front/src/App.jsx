import Home from './views/Home/Home'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Navbar from './components/Navbar/Navbar'
// import About from './views/About/About'
import CreateNewAppointmen from './views/CreateNewAppointment/CreateNewAppointment'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NoAppointments from './views/NoAppointments/NoAppointments'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ErrorPage from './views/ErrorPage/ErrorPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkSession } from './redux/reducer'
import Profile from './views/Profile/Profile'
import Contact from './views/Contact/Contact'
import { Toaster } from 'sonner'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  return (
    <>
      <Toaster richColors position="top-center" />
      <Navbar />
      <Routes>
        {/*Public Routes*/}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {/*Private Routes*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/turns" element={<CreateNewAppointmen />} />
          <Route path="/myTurns" element={<MisTurnos />} />
          <Route path="/NoAppointments" element={<NoAppointments />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        {/*Error Route*/}
        <Route path="*" element={<ErrorPage />} />
      </Routes >


    </>
  )

}

export default App
