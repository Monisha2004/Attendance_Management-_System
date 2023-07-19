import React from 'react';
import Navbar from './navbar';
import './home.css';
import Footer from './footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
function Home() {
  return (
    <div className='mnop'>
      <div className='home-container'>
        <Navbar />
        <div className='home-background'>
          <div className='home-content'>
            <h2>TRUEIN</h2>
            <p className='animated-text'>
              Streamline your attendance tracking process with our advanced system
              <span className='flash'>_____________________________________________________</span>
            </p>
            <Carousel autoPlay={true} interval={1000} showStatus={false} showThumbs={true}>
              <div>
                <img src="https://cdn.techjockey.com/blog/wp-content/uploads/2018/08/27164855/list-top-10-attendance-management-software-growing-businesses_feature.jpg?d=390" alt="Image 1" style={{ width: '80%' }} />
                
              </div>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuC1ADCZRr3BKhUqm3ZpKSrtnDuZU8bGXHiYMF3urp4gK4Qx4C1qjQeN5DLGpfStDht8c&usqp=CAU" alt="Image 2" style={{ width: '80%' }} />
               
              </div>
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosXYNMmzW_-EyvL4WAcqGC6JGbYPWn0PyDQ&usqp=CAU" alt="Image 3" style={{ width: '80%' }} />
              
              </div>
            </Carousel>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
