import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './menubars/home';
import Contact from './menubars/contact';
import Logins from './Logins';
import About from './menubars/about';
import RegisterForm from './RegisterForm';
import ManageStudents from './managestudent';
import Attendance from './menubars/report';
import ITdep from './menubars/it';
import ClassSchedule from './menubars/schedule';
import DepartmentPage from './menubars/departmentpage';
import EEdep from './menubars/ee';
import ECEdep from './menubars/ece';
import CSdep from './menubars/cs';
import CIVILdep from './menubars/civil';
import ManageStudents2 from './managestudent2';
import ManageStudents1 from './managestudent1';
import ManageStudents3 from './managestudent3';
import LeaveForm from './menubars/form';
import Leave from './menubars/leave';
import Generate from './menubars/generate';
import Frontpage from './frontpage';


function App() {
  return (
    <div>
      <Router>
      
        <Routes>
        <Route path='/' element={<Frontpage/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/Logins" element={<Logins/>} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="ManageStudent" element={<ManageStudents/>}/>
          <Route path="report" element={<Attendance/>}/>
          <Route path="schedule" element={<ClassSchedule/>}/>
          <Route path="it" element={<ITdep/>}/>
          <Route path="cs" element={<CSdep/>}/>
          <Route path="ee" element={<EEdep/>}/>
          <Route path="ece" element={<ECEdep/>}/>
          <Route path="civil" element={<CIVILdep/>}/>
          <Route path="departmentpage" element={<DepartmentPage/>}/>
          <Route path="managestudent2" element={<ManageStudents2/>}/>
          <Route path="managestudent1" element={<ManageStudents1/>}/>
          <Route path="managestudent3" element={<ManageStudents3/>}/>
          <Route path="form" element={<LeaveForm/>}/>
          <Route path="leave" element={<Leave/>}/>
          <Route path="generate" element={<Generate/>}/>
           </Routes>
           </Router>
           </div>
           );
          }
          
          export default App;