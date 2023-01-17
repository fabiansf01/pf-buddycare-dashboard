import React, { useState, useEffect } from 'react';
//import React , {useEffect } from 'react'
//import MUIDataTable from "mui-datatables";
//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import axios from "axios";
import Swal from 'sweetalert2';
import { Gadjmuestra } from './Gadjmuestra';
import axios from "axios";






const Testmail = () => {
  
  const [image, setImage] = useState(null);
  const [orTipo, setOrTipo] =useState("")
  const [orId, setOrId] =useState(0)


  useEffect(()=>{
  
    mandaMail();
   },[])


   



   


 

  /*const mandaMail = () => {
    
    window.alert("manda mail")    
    fetch('https://www.fpsoft.com.ar/pfmailer/api.php', {
      method: 'POST',
      mail:"fabianperaltasfco@gmail.com",
      asunto:" MAIL CON FETCH ",
      cuerpo: "CUERPO CON FETCH",
    }).then(response => response.json())
      .then(data => {
       //console.log(data);
       Swal.fire(
        'Exito !!',
        'El mail fue enviado con exito',
        'success'
      )

      });
  }*/



  const mandaMail = async () => {
    try {
      

        
        await axios.post("https://www.fpsoft.com.ar/pfmailer/api.php", {
            mail:"fabianperaltasfco@gmail.com",
            asunto:" MAIL CON FETCH ",
            cuerpo: "CUERPO CON FETCH",
        });

        window.alert("enviado")
        
    } catch (error) {
      // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
      window.alert(error);
    }
  };







  return (
   <div >
   
     
        <h2>-- TEST MAIL --</h2>
 
    </div>




  );
}

export default Testmail;
