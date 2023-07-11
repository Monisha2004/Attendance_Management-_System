import React from 'react';
import './App.css';
import Navbar from './menubars/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './menubars/home';
import Contact from './menubars/contact';
import Logins from './Logins';
import About from './menubars/about';
import RegisterForm from './RegisterForm';

function App() {
  return (
    <div>
      <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/Logins" element={<Logins/>} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
           </Routes>
           </Router>
           </div>
           );
          }
          
          export default App;
          