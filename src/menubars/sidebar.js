import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FcStatistics } from 'react-icons/fc';
import { BsFillPersonCheckFill } from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'View-Profile',
    path: '/report',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Generate Statistics',
    path: '/generate',
    icon: <FcStatistics />,
    cName: 'nav-text'
  },
  {
    title: 'Schedule',
    path: '/schedule',
    icon: <AiOutlineSchedule/>,
    cName: 'nav-text'
  },
 
  {
    title: 'Leave Management',
    path: '/leave',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Mark Attendence',
    path: '/departmentpage',
    icon: <BsFillPersonCheckFill />,
    cName: 'nav-text'
  }
];