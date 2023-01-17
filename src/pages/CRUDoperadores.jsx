//import React from 'react';
import { MuiCRUDoperadores } from '../components/MuiCRUDoperadores.jsx';
//import { MuiCRUDrubros } from '../components/MuiCRUDrubros.jsx';
//import React , {useEffect}  from 'react'
import React , {useState}  from 'react'
import { WatchOutlined } from '@mui/icons-material';
import Denegadooperadores from '../components/Denegadooperadores.jsx'
/*useEffect(() => {
    const rolAlmacenado = window.localStorage.getItem('rol');
    if (rolAlmacenado) {
      setRol(rolAlmacenado);
    }
  }, []);*/




const CRUDoperadores = () => {
// estado permitir acceso a crud operadores si rol = SUPERVISOR


const [permiteCrudoperadores, setPermiteCrudoperadores] = React.useState(true);

   // window.alert(localStorage.getItem('globalrol'))
    
   
   /*let elRol= localStorage.getItem('globalrol');
         
     if (elRol.trim() == "OPERADOR") {
        const habilita = true
        // window.alert("IF EN TRUE")  
        //setPermiteCrudoperadores(true);
            } else {
               // setPermiteCrudoperadores(false);  
         const habilita= false
            }*/

// {/* {permiteCrudoperadores ?  <MuiCRUDoperadores/> :  <DenegadoCRUoperadores/> }*/}

    return ( 
    
    
    <div>
         
             
       
        {localStorage.getItem('globalrol')=='OPERADOR' ? <Denegadooperadores/>:<MuiCRUDoperadores/>}
        
        </div>
    );
};

export default CRUDoperadores