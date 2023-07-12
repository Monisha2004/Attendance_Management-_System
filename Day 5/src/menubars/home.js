import React from 'react';
import Navbar from './navbar';
import './home.css';
import Footer from './footer';

function Home() {
  return (
    <div className='home-container'>
      <Navbar />
      <div className='home-background'>
        <div className='home-content'>
          <h2>ATTENDANCE MANAGEMENT SYSTEM</h2>
          <p className='animated-text'>Streamline your attendance tracking process with our advanced system<span className='flash'>_</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
