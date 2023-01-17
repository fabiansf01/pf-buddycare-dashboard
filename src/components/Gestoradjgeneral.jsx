import React, { useState, useEffect } from 'react';
//import React , {useEffect } from 'react'
//import MUIDataTable from "mui-datatables";
//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import axios from "axios";
import Swal from 'sweetalert2';
import { Gadjmuestragral } from './Gadjmuestragral';




function Gestoradjgeneral() {



    const [image, setImage] = useState(null);
  const [orTipo, setOrTipo] =useState("")
  const [orId, setOrId] =useState(0)


  
  





  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', localStorage.getItem('adjid'));
    formData.append('tipo', localStorage.getItem('adjorigen'));



    
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
        <h2>-- GESTOR GENERAL DE ADJUNTOS --</h2>
      </label>
      <br></br>
         
      
      <label className="text-white">
        
      CRUD Originador : GENERAL 
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
      <Gadjmuestragral/>
    </div>
    
    </div>


  )
}

export default Gestoradjgeneral