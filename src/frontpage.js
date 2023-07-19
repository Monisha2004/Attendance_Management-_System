import React, { useState } from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaUserShield } from 'react-icons/fa';
import './frontpage.css';

import Logins from './Logins';

function Frontpage() {
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleTeacherLoginClick = () => {
    setShowTeacherLogin(true);
    setShowStudentLogin(false);
    setShowAdminLogin(false);
  };

  const handleStudentLoginClick = () => {
    setShowStudentLogin(true);
    setShowTeacherLogin(false);
    setShowAdminLogin(false);
  };

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
    setShowTeacherLogin(false);
    setShowStudentLogin(false);
  };

  return (
    <div className="containers">
      {!showTeacherLogin && !showStudentLogin && !showAdminLogin && (
        <div className="icons-containers">
          <div className="icons" onClick={handleTeacherLoginClick}>
            <FaChalkboardTeacher size={50} />
            <span>Teacher</span>
          </div>
          <div className="icons" onClick={handleStudentLoginClick}>
            <FaUserGraduate size={50} />
            <span>Student</span>
          </div>
          <div className="icons" onClick={handleAdminLoginClick}>
            <FaUserShield size={50} />
            <span>Admin</span>
          </div>
        </div>
      )}

      {showTeacherLogin && (
        
          <Logins />
      )}

      {showStudentLogin && (
          <Logins/>
          )}
          
          {showAdminLogin && (
        <Logins/>
        
      )}
    </div>
  );
}

export default Frontpage;