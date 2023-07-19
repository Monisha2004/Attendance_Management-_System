import React from 'react';
import './schedule.css';
import Navbar from './navbar';
import Footer from './footer';
const ClassSchedule = () => {
  const scheduleData = [
    { day: 'Monday', time: '10:00 AM - 11:30 AM', className: 'Mathematics', room: 'Room A' },
    { day: 'Tuesday', time: '9:00 AM - 10:30 AM', className: 'English', room: 'Room B' },
    { day: 'Wednesday', time: '2:00 PM - 3:30 PM', className: 'Science', room: 'Room C' },
    { day: 'Thursday', time: '11:00 AM - 12:30 PM', className: 'History', room: 'Room D' },
    { day: 'Friday', time: '1:00 PM - 2:30 PM', className: 'Physical Education', room: 'Gymnasium' },
  ];

  return (
    <div>
    <Navbar/>
    <div className='abcd'>
    <table className="schedule-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Time</th>
          <th>Class</th>
          <th>Room</th>
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((schedule, index) => (
          <tr key={index}>
            <td>{schedule.day}</td>
            <td>{schedule.time}</td>
            <td>{schedule.className}</td>
            <td>{schedule.room}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <Footer/>
    </div>
  );
};

export default ClassSchedule;
