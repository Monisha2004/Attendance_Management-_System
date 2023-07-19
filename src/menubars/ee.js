import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
function EEdep() {
  return (
    <div className='aabb'>
    <div style={stles.containe}>
      <Link to='/managestudent' style={stles.link}>1st yr</Link>
      <Link to='/managestudent' style={stles.link}>2nd yr</Link>
      <Link to='/managestudent' style={stles.link}>3rd yr</Link>
      <Link to='/managestudent' style={stles.link}>4th yr</Link>
    </div>
    </div>
  );
}

const stles = {
  containe: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  link: {
    display: 'inline-block',
    margin: '10px',
    padding: '20px 40px',
    fontSize: '18px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '5px',
  },
};

export default EEdep;
