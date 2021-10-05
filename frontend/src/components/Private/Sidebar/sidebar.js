import React, { useState } from 'react';
import './sidebar.css';
import { AdminSidebarData } from './AdminSidebarData';
import { UserSidebarData } from './UserSidebarData';
import {RiMenuLine} from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

const Sidebar = ({sendExpandedvalue}) => {
    const history = useHistory();
    
    const isAdmin = parseInt(localStorage.getItem("Role")) === 2 ? true : false;
    const SidebarData = isAdmin ? AdminSidebarData : UserSidebarData ;
    const sidebarCollapsed=localStorage.getItem('sidebar-collapsed');
    const [isExpanded,setIsExpanded]=useState(sidebarCollapsed?false:true);
    sendExpandedvalue(isExpanded);

    const handleToggler=()=>{
        if(isExpanded){
            setIsExpanded(false);
            localStorage.setItem('sidebar-collapsed',true);
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem('sidebar-collapsed');
    }

    const redirectTo = (path) => {
        history.push(path);
    }


    return ( 
        <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"} >
        <div className="sidebar-header">
            <RiMenuLine className="sidebar-icon" onClick={handleToggler}/>
            
        </div>

        {SidebarData.map((item, index)=>{
            return (
                <div className="sidebar-header" key ={index}>
                    <div className="sidebar-icon">{item.icon}</div>
                    <a id="my-a" onClick={() => redirectTo(item.path)} style={{cursor: "pointer"}} className="sidebar-logo">{item.title}</a>
                </div>        
            );
        })}
    </div>
     );
}
 
export default Sidebar;
