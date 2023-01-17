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


const Sidebarvet = ({children}) => {
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
            path:"/crudarticulos",
            name:"ABM Artículos",
            icon:<FaThList/>
        },
        
        

        
       
        

        {
            path:"/repgeneralesvet",
            name:"Reportes Generales Tienda",
            icon:<FaRegChartBar/>
        }


    ]



    //let first = menuItem.shift();


    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
           <div><Profileinterno/></div>
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Buddy Care DASHBOARD DE Veterinarias</h1>
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

export default Sidebarvet;