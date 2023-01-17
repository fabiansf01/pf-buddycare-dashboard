//import { useState, useEffect } from "react";
import React , {useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Swal from 'sweetalert2';
import Gestoradjuntos from './Gestoradjuntos';



import { NavLink, useNavigate, Navigate,BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";
import { DataSaverOnSharp } from '@mui/icons-material';









export const Gadjmuestragral = () => {



/*--------------------------------------------------------- */

//*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datos, setDatos] = React.useState([]);
  // estados para el formulario
  const [descripcion, setDescripcion] = React.useState("");
  const [estado, setEstado] = React.useState("ACTIVO");
 /* *************************************************** */
 
 
  const [id, setId] = React.useState(0);
  const [foto, setFoto] = React.useState("");
  // estado para controlar el boton modificar en el formulario
  const [validacionModificar, setValidacionModificar] = React.useState(false);
  // guardar el id a modificar
  const [idModificar, setIdModificar] = React.useState(0);
  // CONTROL VENTANA MODAL 
  const [showModal, setShowModal] = React.useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(false);
  // ***** CONTROL DEL MODULO ADJUNTOS  **** //
  const [adjuntos, setAdjuntos] = React.useState(false);
  
  // funcion abre y cierra modal 
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  
  
  
  
 


  


   useEffect(()=>{
  
    cargarDatos();
   },[])
   
  
   const cargarDatos = async ()=>{
    //const elQueryb ={"myQuery":`select * from pfvet_operadores where trim(email) = '${user.email}' limit 1 ;`};
    const elQueryb ={"myQuery":`select * from pfvet_adjuntos where trim(originador) = 'GENERAL';`};
    const respuesta = await axios.post("https://buddy-care-rest-api.onrender.com/query", elQueryb)
    console.log(respuesta)
    setDatos(respuesta.data);
   }
   
  
  
  
  
  
  // ***************************************    elimina registro
  const eliminarRegistro = async (id)=> {
   
  Swal.fire({
  title: `Está seguro de borrar este registro ID: ${id} ?`,
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'CANCELAR'
  // confirmButtonText: 'SI,  borrar !!'
}).then((result) => {
  if (result.isConfirmed) {
    const elQueryd ={"myQuery":`delete  from pfvet_adjuntos where id = ${id} ;`};
      axios.post(`https://buddy-care-rest-api.onrender.com/query`, elQueryd)
      cargarDatos();
    
  }
})


    }
  
   
//3 - Definimos las columns
const columns = [


    {
        name: "Borrar",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button className='btn btn-danger btn-sm' onClick={()=>eliminarRegistro(tableMeta.tableData[tableMeta.rowIndex][2])}>
                Borrar
              </button>
            );
          }
        }
      },

      
      {
        name: "Imagen",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <img src={tableMeta.tableData[tableMeta.rowIndex][4]} alt={tableMeta.tableData[tableMeta.rowIndex][4]} style={{ width: '60px', height: '60px' }}/>
            );
          }
        }
      },



    
    { name: "id", label: "ID" },
    { name: "originador",label: "ORIGINADOR" },
    { name: "contenido",label: "CONTENIDO" },
    
   
]


/*const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});*/

const darkTheme = createTheme({
    palette: { mode: 'dark',},
     components: { MuiTableCell: { styleOverrides:{ root: {
           padding: '5px',
           size:'small'
          }}
       }},

       typography: {fontSize: 9, },
       
 });

const options = {
  
  rowsPerPage: 4,
};

//4 - renderizamos la datatable
        return (
         
         
         <>
          <> 
          <p>-- GESTION DE ADJUNTOS GENERALES --</p>
          <button className='btn btn-info btn-sm'
				onClick={cargarDatos}>REFRESCAR LISTA GENERAL  </button>
          
          
          
          </>
          <ThemeProvider theme={darkTheme}>
            <MUIDataTable 
            title={"- Info adjuntos -"}
            data={datos}
            columns={columns}
            options={options}
            />
           </ThemeProvider>
           <> <p>(C) 2022 - PF Buddy Care</p></>
           

        

    <div>
    
    </div>
    

            </>
        )

}