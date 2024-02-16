import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx'; 
import Login from './pages/Login.jsx';
import Navbar from './components/NavBar.jsx';
import Admin from './components/Admin.jsx';
import Perfil from './components/Perfil.jsx';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/perfil" element={<Perfil />} /> 
      </Routes>
    </Router>
  );
}

export default App;
