import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../sidebar';
import './navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const toggleDropdown = () => setDropdown(!dropdown);

  const closeDropdown = () => setDropdown(false);

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <ul className='horizontal-list'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/logins'>Login</Link>
            </li>
            <li className='dropdown-container'>
              <div className='profile-icon' onClick={toggleDropdown}>
                <FaIcons.FaUserCircle />
              </div>
              {dropdown && (
                <div className='dropdown-menu'>
                  <Link to='/myprofile' onClick={closeDropdown}>My Profile</Link>
                  <Link to='/settings' onClick={closeDropdown}>Settings</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
