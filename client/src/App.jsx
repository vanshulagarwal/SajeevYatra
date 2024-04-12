import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Pages/Layout/Layout';
import Login from './Pages/User/Login/Login.jsx'
import AmbulanceRegister from './Pages/AmbulanceDriver/AmbulanceRegister/AmbulanceRegister.jsx';
import HospitalRegister from './Pages/Hospital/HospitalRegis/HospitalRegistration.jsx';
import BookAmbulance from './Pages/BookAmbulance/BookAmbulance.jsx';
import UserDashboard from './Pages/User/Dashboard/Userdashboard.jsx';
import HospitalDashboard from './Pages/Hospital/HospitalDashboard/HospitalDashboard.jsx';
import AmbulanceDashboard from './Pages/AmbulanceDriver/AmbulanceDashboard/AmbulanceDashboard.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/ambulance/login' element={<AmbulanceRegister />} />
          <Route path='/hospital/register' element={<HospitalRegister />} />
          <Route path='/bookambulance/questions' element={<BookAmbulance />} />
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/hospital/dashboard' element={<HospitalDashboard />} />
          <Route path='/ambulance/dashboard' element={<AmbulanceDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
