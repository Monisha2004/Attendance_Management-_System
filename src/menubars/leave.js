import React from 'react';
import './leave.css';
import Navbar from './navbar';
import { Button } from '@mui/material';
import Footer from './footer';
function Leave() {
  return (
      <div className='leave'>
      <Navbar/>
    <div className='leave-bg'>
    <div className='ltext'>
    <center><div>My Leaves</div></center></div>
    <div className='box-container'>
    <div className='box'>
    <p>Start_Date : 02-07-2023 </p>
    <p>End_Date : 02-07-2023</p>
    <p>Total Days : 1</p>
    <p>Reason : Sick Leave</p></div>
    <div className='box'>    
    <p>Start_Date : 15-06-2023 </p>
    <p>End_Date : 15-06-2023</p>
    <p>Total Days : 1</p>
    <p>Reason : Sick Leave</p>
    </div>
    <div className='box'>    
    <p>Start_Date : 15-06-2023 </p>
    <p>End_Date : 15-06-2023</p>
    <p>Total Days : 1</p>
    <p>Reason : Sick Leave</p>
    </div>
  </div>
  <div className='box-container'>
    <div className='box'>
    <p>Start_Date : 06-06-2023 </p>
    <p>End_Date : 06-06-2023</p>
    <p>Total Days : 1</p>
    <p>Reason : Personal Leave</p></div>
    <div className='box'>
    <p>Start_Date : 11-04-2023 </p>
    <p>End_Date : 12-04-2023</p>
    <p>Total Days : 2</p>
    <p>Reason  :Sick Leave</p></div>
    <div className='box'>
    <p>Start_Date : 23-03-2023 </p>
    <p>End_Date : 23-03-2023</p>
    <p>Total Days : 1</p>
    <p>Reason : Personal Leave</p></div>
    
  </div>
   
  <br></br>
    <div><center><Button variant="contained" href="/form" color='success'>Request Leave</Button></center></div>
    </div>
    <div>
    <Footer/>
    </div>
    </div>
   
    );
  }
export default Leave;