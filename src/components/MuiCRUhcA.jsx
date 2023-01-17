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









export const MuiCRUDhcA = () => {

 
/* sql par atraer mascotas con dueños

{
		"myQuery": "select pfvet_mascotas.id,pfvet_mascotas.
        nombre,pfvet_mascotas.especie, pfvet_clientes.id,
        concat(pfvet_clientes.apellido,' ' ,
         pfvet_clientes.nombres) as due from
          pfvet_mascotas inner join pfvet_clientes
           on pfvet_mascotas.id_cliente=pfvet_clientes.id;"
		
	}
*/




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
  
  
  
 
  
  
  // Toggle for Modal
 // const toggle = () => setModal(!modal);
  function toggle(e){
    e.preventDefault();
    setModal(!modal);

  } 
    


  function togglesine(){
       setModal(!modal);
  }  



   useEffect(()=>{
  
    cargarDatos();
    localStorage.setItem("adjorigen", "GENERAL,666")
   },[])
   
  
   const cargarDatos = async ()=>{
    const elQueryb = {"myQuery": "select pfvet_mascotas.id,pfvet_mascotas.nombre,pfvet_mascotas.especie, pfvet_clientes.id iddue, concat(pfvet_clientes.apellido,' ', pfvet_clientes.nombres) as due from pfvet_mascotas inner join pfvet_clientes  on pfvet_mascotas.id_cliente=pfvet_clientes.id order by pfvet_mascotas.nombre;"}
	
    const respuesta = await axios.post("https://buddy-care-rest-api.onrender.com/query",elQueryb)
    console.log(respuesta)
    setDatos(respuesta.data);
   }
   
  
 
  
  
  
  
  
  
  
  
  
  
  
   
  
  




  const navigate = useNavigate(); 
    
  const routeChangeAdj = async (id,nombre) =>{ 
   
    
    let cadena = id.toString() 
    let cadenadatos = nombre
    localStorage.setItem('mascotaorigen',cadena );
    localStorage.setItem('mascotadatos',cadenadatos );
    
    //localStorage.setItem('adjid',id.toString() ); 

    //window.alert(localStorage.getItem('adjorigen' ))
    //window.alert(localStorage.getItem('adjid' ))
    //let path = '/adjb'; 
    let path = '/hcb'; 
    navigate(path);
  
  
  
  }












//3 - Definimos las columns
const columns = [


    

      
      {
        name: "Seleccionar",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
              return (
             <div>
             <button className='btn btn-info btn-sm' onClick={()=>routeChangeAdj(tableMeta.tableData[tableMeta.rowIndex][1],tableMeta.tableData[tableMeta.rowIndex][2])}>
              Seleccionar
            </button>
            </div>
            );
          }
        }
      },


    
    { name: "id", label: "ID.MASCOTA" },
    { name: "nombre",label: "NOMBRE" },
    { name: "especie",label: "ESPECIE" },
    { name: "due",label: "DUEÑO" },
    
   
]


const darkTheme = createTheme({
    palette: { mode: 'dark',},
     components: { MuiTableCell: { styleOverrides:{ root: {
           padding: '2px',
           size:'small'
          }}
       }},

       typography: {fontSize: 10, },
       
 });

const options = {
  
  rowsPerPage: 9,
};

//4 - renderizamos la datatable
        return (
         
         
         <>
          <> 
          
                   
          
          </>
          <ThemeProvider theme={darkTheme}>
            <MUIDataTable 
            title={"-- SELECCION DE MASCOTA PARA ALTA DE H.C -- Paso 1 : Seleccione la Mascota sobre la cual va a realizar ABM de Historia Clínica"}
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