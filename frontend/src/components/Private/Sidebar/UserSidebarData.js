
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const UserSidebarData = [
  {
    title: 'MyCourses',
    path: '/mycourse',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Buy Course',
    path: '/buycourse',
    icon: <FaIcons.FaWallet />,
    cName: 'nav-text'
  },
  {
    title: 'FAQ',
    path: '/faq',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
 
  // {
  //   title: 'Test Page',
  //   path: '/test page',
  //   icon: <FaIcons.FaWallet />,
  //   cName: 'nav-text'
  // }
];