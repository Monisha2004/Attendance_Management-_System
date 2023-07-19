import React from 'react';
import './attendence.css';
import Navbar from './navbar';
import Footer from './footer';
import Calendar from './calendar';
function Attendance() {
  return (
    <div >
    <div className='hdfc'>
    <Navbar/>
    </div>
    <div className='attendance'>

    <div className='att-bg'>
    <div className='atext'>PROFILE</div>
    <div className='user'>
    <table cellSpacing={15}><tr><td className='name-cell'>Name:Monisha</td>
    <td><b>Roll Number:727721EUCS079</b></td></tr>
    <tr><td><b>Email-Id:727721eucs079@skcet.ac.in</b></td>
    <td><b>Class :CSE-B</b></td></tr></table></div>

    </div>
    </div>
    <Calendar/>
    <Footer/>
    </div>
    );
  }

export default Attendance;