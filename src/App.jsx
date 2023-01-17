import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Sidebarprof from './components/Sidebarprof'
import Sidebarvet from './components/Sidebarvet';


import CRUDoperadores from './pages/CRUDoperadores.jsx';
import CRUDrubros from './pages/CRUDrubros.jsx';
import CRUDveterinarias from './pages/CRUDveterinarias.jsx';
import CRUDprofesionales from './pages/CRUDprofesionales.jsx';
import REPtienda from './pages/REPtienda.jsx';
import REPgenerales from './pages/REPgenerales.jsx';


import CRUDhistorias from './pages/CRUDhistorias';
import CRUDhorarios from  './pages/CRUDhorarios';
import REPgeneralesprof from './pages/REPgeneralesprof';

import CRUDarticulos from './pages/CRUDarticulos';
import REPgeneralesvet from './pages/REPgeneralesvet';



import { homeContainer } from "./components/Homedash.module.css";
import Homedash from './components/Homedash';
import { useAuth0,withAuthenticationRequired } from "@auth0/auth0-react";
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Profileinterno from './components/Profileinterno';
import {linea} from "./components/Loggroup.module.css"
import Gestoradjuntos from './components/Gestoradjuntos';
import Gadjlauncher from './pages/Gadjlauncher.jsx';
import Gadjlauncherb from './pages/Gadjlauncherb.jsx';
import  { MuiCRUDhcB }   from './components/MuiCRUDhcB';
import ShopCards from './pages/ShopCards';
import MascoCards from './pages/MascoCards';
//import Testmail from './components/Testmail';
const App = () => {
  const {isAuthenticated,logout,user} = useAuth0
  console.log(user);
  
  localStorage.setItem('profileid',"---" );        
  localStorage.setItem('profiledenomina',"----");
  return (
    

   <div >

<div class="d-flex">
  <LoginButton class="mx-2"/>
  <LogoutButton class="mx-2"/>
  <Profile class="mx-2"/>
  
</div>


 
       <BrowserRouter>
       
       <Routes>
       
       
       <Route path="/" element={<Homedash />} />
         
       <Route path="/oper" element={<Sidebar><CRUDrubros /></Sidebar>} />

       <Route path="/adjuntos" element={<Sidebar><Gadjlauncher /></Sidebar>} />
       <Route path="/adjb" element={<Sidebar><Gadjlauncherb /></Sidebar>} />
       <Route path="/adjuntosprof" element={<Sidebarprof><Gadjlauncher /></Sidebarprof>} />
       <Route path="/adjuntosvet" element={<Sidebarvet><Gadjlauncher /></Sidebarvet>} />
      
      



        
          <Route path="/sdop" element={<Sidebar><CRUDoperadores /></Sidebar>} />
          <Route path="/crudoperadores" element={<Sidebar><CRUDoperadores /></Sidebar>} />
          <Route path="/crudrubros" element={<Sidebar><CRUDrubros /></Sidebar>} />
          <Route path="/crudveterinarias" element={<Sidebar><CRUDveterinarias /></Sidebar>} />
          <Route path="/crudprofesionales" element={<Sidebar><CRUDprofesionales /></Sidebar>} />
          <Route path="/reptienda" element={<Sidebar><REPtienda /></Sidebar>} />
          <Route path="/repgenerales" element={<Sidebar><REPgenerales /></Sidebar>} />
          <Route path="/shopprev" element={<Sidebar><ShopCards /></Sidebar>} />
          <Route path="/mascoprev" element={<Sidebar><MascoCards /></Sidebar>} />
      
         
       
          <Route path="/prof" element={<Sidebarprof><CRUDhorarios /></Sidebarprof>} />
          
          <Route path="/crudhorarios" element={<Sidebarprof><CRUDhorarios /></Sidebarprof>} />
          <Route path="/crudhistorias" element={<Sidebarprof><CRUDhistorias /></Sidebarprof>} />
          <Route path="/repgeneralesprof" element={<Sidebarprof><REPgeneralesprof /></Sidebarprof>} />
          
          <Route path="/hcb" element={<Sidebarprof><MuiCRUDhcB /></Sidebarprof>} />

          <Route path="/petshop" element={<Sidebarvet><CRUDarticulos /></Sidebarvet>} />
          
          <Route path="/crudarticulos" element={<Sidebarvet><CRUDarticulos /></Sidebarvet>} />
          <Route path="/repgeneralesvet" element={<Sidebarvet><REPgeneralesvet /></Sidebarvet>} />
        



       </Routes>
       
       
       

  </BrowserRouter>
    
    
      
 
    
    

    
    </div>


  );
};

export default withAuthenticationRequired(App);

//export default App;