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


export const MuiCRUDveterinarias = () => {

  /*  id                   integer  NOT NULL  ,
	razon                char(65)  NOT NULL  ,
	responsable          char(65)  NOT NULL  ,
	provincia            char(65)    ,
	localidad            char(55)  NOT NULL  ,
	direccion            char(95)  NOT NULL  ,
	telefono             char(55)  NOT NULL  ,
	facebook             char(65)    ,
	instagram            char(65)    ,
	descripcion          char(65)    ,
	fotos                text    ,
	falta                date    ,
	halta                time    ,
	estado               char(20)    ,
	usuario              char(25)    ,
	password             char(50) NOT NULL  ,
	email                char(80)  NOT NULL  , */






//*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datos, setDatos] = React.useState([]);
  
  
  // estados para el formulario
  const [razon, setRazon] = React.useState("");
  const [responsable, setResponsable] = React.useState("");
  const [provincia, setProvincia] = React.useState("");
  const [localidad, setLocalidad] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  
  const [usuario, setUsuario] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fotos, setFotos] = React.useState("");
  const [falta, setFalta] = React.useState("0000-00-00");
  const [halta, setHalta] = React.useState("00:00:00");  
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
    const respuesta = await axios.get("https://buddy-care-rest-api.onrender.com/veterinarias")
    console.log(respuesta)
    setDatos(respuesta.data);
   }
   
  
  // ********************   agrega registro ********************
  
  const agregarRegistro = async (e)=> {
   
    try{
    
    if(razon.length<1 || responsable.length<1 || provincia.length<1 || localidad.length<1  || direccion.length<1 || telefono.length<1 || usuario.length<1 || password.length<1 || email.length<1){
     Swal.fire({
        icon: 'error',
        title: 'Complete la informacion requerida',
        text: '',
       
      })
    }else{

       

      e.preventDefault();
       
     // window.alert(descripcion)


      await  axios.post("https://buddy-care-rest-api.onrender.com/veterinarias",{
       id:getRandomInt(1111111, 9999999),
       razon    ,
	    responsable ,
	    provincia,
	    localidad,
	    direccion ,
	    telefono ,
	    facebook,
	    instagram,
	    descripcion,
	    fotos : "mifoto",
        falta: "2022-01-01",
        halta:"00:00:00",    
	    estado:"ACTIVO",
	    usuario ,
	    password ,
	    email 
        



    })
         togglesine();
         cargarDatos();
    }


        } catch (error) {
    // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
    window.alert(error);


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
  
      axios.delete(`https://buddy-care-rest-api.onrender.com/veterinarias/${id}`)
      cargarDatos();
    
  }
})


    }
  
   // **************************************************** Activar la modificacion 
   const activarModificacion = async(id) =>{
    const respuesta = await axios.get(`https://buddy-care-rest-api.onrender.com/veterinarias/${id}`)
    //setDescripcion(respuesta.data.descripcion)
    setRazon(respuesta.data.razon)
    setResponsable(respuesta.data.responsable)
    setProvincia(respuesta.data.provincia)
    setLocalidad(respuesta.data.localidad)
    setDireccion(respuesta.data.direccion)
    setTelefono(respuesta.data.telefono)
    setFacebook(respuesta.data.facebook)
    setInstagram(respuesta.data.instagram)
    setDescripcion(respuesta.data.descripcion)
    setFotos(respuesta.data.fotos)
    
    setEstado(respuesta.data.estado)
    setUsuario(respuesta.data.usuario)
    setPassword(respuesta.data.password)
    setEmail(respuesta.data.email)
       
    
    setFalta(respuesta.data.falta)
     setHalta(respuesta.data.halta)


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
        
            await  axios.put(`https://buddy-care-rest-api.onrender.com/veterinarias/${idModificar}`,{
                razon    ,
                responsable ,
                provincia,
                localidad,
                direccion ,
                telefono ,
                facebook,
                instagram,
                descripcion,
                fotos : "mifoto" ,
                falta: "2022-01-01",
                halta:"00:00:00" ,   
                estado,
                usuario ,
                password ,
                email  , 
             



    
           })
    
          togglesine();
          cargarDatos();
          setValidacionModificar(false)
    }

  }





  const navigate = useNavigate(); 
    
  const routeChangeAdj = async (id) =>{ 
   
    
    let cadena = "VETERINARIAS"+","+id.toString() 
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
    { name: "razon",label: "RAZON" },
    { name: "responsable",label: "RESPONSABLE" },
    { name: "localidad",label: "LOCALIDAD" },
    { name: "telefono",label: "TELEFONO" },
    { name: "email",label: "EMAIL" },
   
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
          <p>VETERINARIAS afiliadas al SISTEMA</p>

          <button className='btn btn-success btn-sm'
				onClick={toggle}>AGREGAR VETERINARIA </button>
          
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
               <label for="validationCustom01"  className="form-label">Razón</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={razon} onChange={(e)=>setRazon(e.target.value) } required />
              <div id="emailHelp" class="form-text">Razón social del comercio</div>
              </div>
              
              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Responsable</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={responsable} onChange={(e)=>setResponsable(e.target.value) } required />
              <div id="emailHelp" class="form-text">Responsable en vinculación con BUDDYCARE</div>
              </div>

              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Provincia</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={provincia} onChange={(e)=>setProvincia(e.target.value) } required />
              
              </div>


              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Localidad</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={localidad} onChange={(e)=>setLocalidad(e.target.value) } required />
              
              </div>
              
              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Dirección</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={direccion} onChange={(e)=>setDireccion(e.target.value) } required />
              
              </div>
              
                <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Teléfono</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={telefono} onChange={(e)=>setTelefono(e.target.value) } required />
               </div>
              
               <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Facebook</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={facebook} onChange={(e)=>setFacebook(e.target.value) } required />
              
              </div>
              
              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Instagram</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={instagram} onChange={(e)=>setInstagram(e.target.value) } required />
              
              </div>


              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">E-Mail</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={email} onChange={(e)=>setEmail(e.target.value) } required />
              
              </div>

              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Usuario</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={usuario} onChange={(e)=>setUsuario(e.target.value) } required />
              
              </div>
              
              
              <div className="mb-3">
               <label for="validationCustom01"  className="form-label">Password</label>
               <input type="text" className="form-control form-control-sm" id="validationCustom01" value={password} onChange={(e)=>setPassword(e.target.value) } required />
              
              </div>
              

              <div className="mb-3">
                        <label for="validationCustom01" className="form-label">
                          Nota
                        </label>
                        <textarea className="form-control"
                          type="textarea"
                          class="form-control form-control-sm"
                          id="validationCustom01"
                          style={{ height: '200px', width: '300px', resize: 'both' }}
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                          required
                        />
                         <div id="emailHelp" class="form-text">Descripción de la actividad de la Veterinaria</div>
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
              <div id="emailHelp" class="form-text">Seleccione el estado de la VETERINARIA</div>
     
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