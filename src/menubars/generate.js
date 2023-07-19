import React from 'react';
import './generate.css';
import { Button } from '@mui/material';
import Navbar from './navbar';
import Footer from './footer';
function Generate() {
  return (
    <div>
      <Navbar/>
    <div className='generate'>
    <div className='g-bg'>
    <div className='gtext'>Generate Reports</div>
    <div className='gform-container'>
    <form>
      <label>
        Start Date:
        <input
          type="date"
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="date"
        />
      </label>
      <br />
      </form>
      <center><Button variant="contained" color='primary'
      onClick={() => {
        window.open(
          "https://drive.google.com/file/d/1mozwsmeo6CzhFPg2UkALlorxCnTv-sw0/view?usp=sharing"
        );
      }}>Download Report ⬇️</Button></center>
    </div>
    </div>
    </div>
    <div>
    <Footer/>
    </div>
    </div>
    );
  }

export default Generate;