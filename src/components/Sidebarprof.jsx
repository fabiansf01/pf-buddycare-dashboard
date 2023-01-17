import React, { useState } from 'react';
import Profileinterno from './Profileinterno';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
   
    const menuItem=[
    

       /* {
            path:"/",
            name:"ABM Operadores",
            icon:<FaTh/>
        },*/
       
       
        {
            path:"/",
            name:"Home",
            icon:<FaTh/>
        },
       
       
       
       
        {
            path:"/crudhorarios",
            name:"ABM Horarios",
            icon:<FaThList/>
        },
        {
            path:"/crudhistorias",
            name:"ABM Historias Clínicas",
            icon:<FaThList/>
        },
        

        
       
        

        {
            path:"/repgeneralesprof",
            name:"Reportes Generales",
            icon:<FaRegChartBar/>
        }


    ]



    //let first = menuItem.shift();


    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
            <div><Profileinterno/></div>
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Buddy Care DASHBOARD DE Profesionales</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;