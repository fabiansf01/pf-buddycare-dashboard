import React, { useState, useEffect } from 'react';
//import React , {useEffect } from 'react'
//import MUIDataTable from "mui-datatables";
//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import axios from "axios";
import Swal from 'sweetalert2';
import { Gadjmuestra } from './Gadjmuestra';







const Gestoradjuntos = () => {
  
  const [image, setImage] = useState(null);
  const [orTipo, setOrTipo] =useState("")
  const [orId, setOrId] =useState(0)


  useEffect(()=>{
  
    asumeOrigen();
   },[])


   const asumeOrigen = () => {
     let cadena = localStorage.getItem("adjorigen");
     let array= cadena.split(",")
      setOrTipo(array[0])
      setOrId(array[1])
    //localStorage.setItem("adjorigen", "GENERAL,666")
     
     //let miadjid = localStorage.getItem("adjid");
     //setOrId(parseInt(miadjid));

    // localStorage.setItem("adjorigen", "GENERAL");
    // localStorage.setItem("adjid", "666"); 

   };




   //localStorage.setItem("adjorigen", "GENERAL,666")



  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let cadenab = localStorage.getItem("adjorigen");
     let arrayb= cadenab.split(",")
    const formData = new FormData();
   // window.alert(arrayb[0],arrayb[1])
    formData.append('image', image);
    formData.append('id', arrayb[1]);
    formData.append('tipo', arrayb[0]);



    
    fetch('https://www.fpsoft.com.ar/pfsubefotos/backend8.php', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => {
       //console.log(data);
       Swal.fire(
        'Exito !!',
        'El archivo fue subido al servidor de imágenes',
        'success'
      )

      });
  }






  return (
   <div className="form-group mb-3  ms-5 ">
   
     <form onSubmit={handleSubmit} className="bg-dark">
     <label className="text-white">  
        <h2>-- GESTOR DE IMAGENES ADJUNTAS --</h2>
      </label>
      <br></br>
         
      
      <label className="text-white">
        
      CRUD Originador : {orTipo} Id Originador {orId}
      </label>
      <br></br>
      <br></br>
      <label className="text-white">  
        <h3>Seleccionar imagen:</h3>
        
      </label>
      <br></br> <br></br>
      <input type="file" className="form-control" onChange={handleImageChange} />
      <br></br>
      <div className="d-grid">
      <button type="submit" className="btn btn-outline-danger" >Enviar imagen</button>
      </div>
    </form>
    
    
    <div>
      <Gadjmuestra/>
    </div>
    
    </div>




  );
}

export default Gestoradjuntos;
