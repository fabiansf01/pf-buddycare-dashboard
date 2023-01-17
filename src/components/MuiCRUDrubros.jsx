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









export const MuiCRUDrubros = () => {

 // localStorage.removeItem('adjorigen');
 // localStorage.removeItem('adjid');


/*------------------------------ MARCADO PARA PROBAR CON OTRA TECNICA ---
 //1 - configuramos Los hooks
const [products, setProducts] = useState( [] )

//2 - fcion para mostrar los datos con axios
//const endpoint = 'https://fakestoreapi.com/products'
const endpoint = "https://buddy-care-rest-api.onrender.com/query/"
const elQuery =[{"myQuery":"select * from pfvet_articulos;"}];
const getData = async () => {
    await axios.post(endpoint,{"myQuery":"select * from pfvet_rubros ;"}).then((response) => {
        const data = response.data
    //    console.log(data)
   // const {data} = await axios.get(endpoint)

       
        setProducts(data)
    
})};

useEffect( ()=>{
    getData()
}, [])
--------------------------------------------------------- */

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
  
  
  
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  
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
    const respuesta = await axios.get("https://buddy-care-rest-api.onrender.com/rubros")
    console.log(respuesta)
    setDatos(respuesta.data);
   }
   
  
  // ********************   agrega registro ********************
  
  const agregarRegistro = async (e)=> {
  
    if(descripcion.length<1){
     Swal.fire({
        icon: 'error',
        title: 'Complete la informacion requerida',
        text: '',
       
      })
    }else{
      e.preventDefault();
       await  axios.post("https://buddy-care-rest-api.onrender.com/rubros",{
       id:getRandomInt(1111111, 9999999),
       descripcion,
       estado,
        foto:"mifoto"
    })
         togglesine();
         cargarDatos();
    }

  }
  
  
  
  //    ******************* ABRE GESTION DE ADJUNTOS  **********//
 const  abreAdjuntos=()=>{
    setAdjuntos(true)
  }
  
  
  
  
  
  
  
  // ***************************************    elimina registro
  const eliminarRegistro = async (id)=> {
   
  Swal.fire({
  title: 'Está seguro de borrar este registro  ?',
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'CANCELAR'
  // confirmButtonText: 'SI,  borrar !!'
}).then((result) => {
  if (result.isConfirmed) {
  
      axios.delete(`https://buddy-care-rest-api.onrender.com/rubros/${id}`)
      cargarDatos();
    
  }
})


    }
  
   // **************************************************** Activar la modificacion 
   const activarModificacion = async(id) =>{
    const respuesta = await axios.get(`https://buddy-care-rest-api.onrender.com/rubros/${id}`)
    setDescripcion(respuesta.data.descripcion)
    setValidacionModificar(true)
    setIdModificar(id)
    togglesine();
    
   } 
  
  
  // ***************************   modifica registro
  const modificarRegistro = async (e)=> {
    e.preventDefault();
    if(descripcion.trim().length<1){
             Swal.fire({
                icon: 'error',
                title: 'Complete la informacion requerida',
              text: '',
       
             })
    }else{
        
            await  axios.put(`https://buddy-care-rest-api.onrender.com/rubros/${idModificar}`,{
            descripcion,
           estado,
           foto:"mifoto"
    
           })
    
          togglesine();
          cargarDatos();
          setValidacionModificar(false)
    }

  }





  const navigate = useNavigate(); 
    
  const routeChangeAdj = async (id) =>{ 
   
    
    let cadena = "RUBROS"+","+id.toString() 
    localStorage.setItem('adjorigen',cadena );
    //localStorage.setItem('adjid',id.toString() ); 

    //window.alert(localStorage.getItem('adjorigen' ))
    //window.alert(localStorage.getItem('adjid' ))
    //let path = '/adjb'; 
    let path = '/adjuntos'; 
    navigate(path);
  
  
  
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
        name: "Modificar",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
              return (
              <div  className="btn-group">
              <button className='btn btn-warning btn-sm' onClick={()=>activarModificacion(tableMeta.tableData[tableMeta.rowIndex][2])}>
                Modificar
              </button>
             <button className='btn btn-info btn-sm' onClick={()=>routeChangeAdj(tableMeta.tableData[tableMeta.rowIndex][2])}>
              ADJ
            </button>
            </div>
            );
          }
        }
      },


    
    { name: "id", label: "ID" },
    { name: "descripcion",label: "DESCRIPCION" },
    { name: "estado",label: "ESTADO" },
    
   
]


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const options = {
  
  rowsPerPage: 6,
};

//4 - renderizamos la datatable
        return (
         
         
         <>
          <> 
          <p>Rubros de relación para artículos de Veterinaria</p>

          <button className='btn btn-success btn-sm'
				onClick={toggle}>AGREGAR RUBRO </button>
          
          </>
          <ThemeProvider theme={darkTheme}>
            <MUIDataTable 
            title={"- Rubros -"}
            data={datos}
            columns={columns}
            options={options}
            />
           </ThemeProvider>
           <> <p>(C) 2022 - PF Buddy Care</p></>
           

          {/* -- PARTE MODAL DEL TEMA ------------------------- */}        
<div style={{
			display: 'block', width: 500, padding: 30
		}}>
			
			
			<Modal isOpen={modal}
				toggle={toggle}
				modalTransition={{ timeout: 10 }}>
				<ModalBody>
					
        <div className='col-12'>
                  <h3 className='text-center'>Nuevo/Modifica</h3>    
              
              
              <form >
              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Descripción</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={descripcion} onChange={(e)=>setDescripcion(e.target.value) } required />
              <div id="emailHelp" class="form-text">Complete la descripcion del rubro</div>
     
              </div>
              
              
             {/*} <div className="mb-3">
               <label  className="form-label">Estado</label>
               <input type="text" className="form-control " onChange={(e)=>setEstado(e.target.value)} />
             </div>*/}

              <div className="mb-3">
              <label  className="form-label">Estado</label>
              <select className="form-control" onChange={(e)=>setEstado(e.target.value)}>
              <option value="ACTIVO" >ACTIVO</option>
              <option value="INHABILITADO">INHABILITADO</option>    
              </select>
              <div id="emailHelp" class="form-text">Seleccione el estado del rubro</div>
     
              </div>



              <div className="mb-3">
              
              {validacionModificar ? (
              <button className='btn btn-warning btn-sm' type="submit" onClick={(e)=>modificarRegistro(e)}>Modificar</button>
              ):(
              <button className='btn btn-success btn-sm' type="submit" onClick={(e)=>agregarRegistro(e)}>Agregar</button> 
              )
              }
              </div>
              <div className="mb-3">
              <button className='btn btn-info btn-sm' onClick={(e)=>toggle(e)}>Cancela</button>
              </div>
              
              </form>
              
              </div>

				</ModalBody>
			</Modal>
		</div >
    {/*-------- FIN DE LA PARTE MODAL  ------- */}  


    <div>
    
    </div>
    

            </>
        )

}