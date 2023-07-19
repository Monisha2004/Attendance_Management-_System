import React from 'react';
import './Footer.css';

import { Google, Twitter, WhatsApp } from '@mui/icons-material';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-heading">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget mauris in nulla convallis
            tincidunt ac a metus. Morbi vulputate magna at quam mattis posuere.
          </p>
        </div>
        <div className="footer-section contact">
          <h2 className="footer-heading">Contact Us</h2>
          <div className="contact-info">
            <div>
              <span className="contact-icon">
                <i className="fa fa-map-marker"></i>
              </span>
              <span className="contact-text">123 Street, City, Country</span>
            </div>
            <div>
              <span className="contact-icon">
                <i className="fa fa-phone"></i>
              </span>
              <span className="contact-text">+123 456 7890</span>
            </div>
            <div>
              <span className="contact-icon">
                <i className="fa fa-envelope"></i>
              </span>
              <span className="contact-text">info@example.com</span>
            </div>
          </div>
        </div>
        <div className="footer-section links">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-links">
            <li><a href="https://www.google.com/"><Google/></a></li>
            <li><a href="https://web.whatsapp.com/"><WhatsApp/></a></li>
            <li><a href="https://twitter.com/home"><Twitter/></a></li>
         
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">© 2023 All rights reserved. Truein</p>
      </div>
    </footer>
  );
}

export default Footer;
