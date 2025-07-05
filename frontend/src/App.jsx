import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Demo from './Demo'
import Register from './Pages/Register';
import Home from './Pages/Home';
import Login from './Pages/Login';
function App() {
 return (
   <div>
     <nav>
       <Link to="/" style={{ marginRight: "1rem" }}>
         Register
       </Link>
       <Link to="/login" style={{ marginRight: "1rem" }}>
         Login
       </Link>
       <Link to="/home">Home</Link>
     </nav>

     <Routes>
       <Route path="/" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/home" element={<Home />} />
     </Routes>
   </div>
 );
}

export default App
