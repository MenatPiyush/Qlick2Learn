import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {AiOutlineQuestionCircle } from "react-icons/ai"; 
import {GoNote }  from "react-icons/go";

export const AdminSidebarData = [
  {
    title: 'Manage User',
    path: '/expert/users',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Course',
    path: '/expert/courses',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Notes',
    path: '/expert/notes',
    icon: <GoNote />,
    cName: 'nav-text'
  },
  {
    title: 'FAQ',
    path: '/expert/faq',
    icon: <AiOutlineQuestionCircle />,
    cName: 'nav-text'
  }

];