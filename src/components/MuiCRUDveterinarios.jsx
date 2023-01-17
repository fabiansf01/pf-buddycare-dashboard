//import { useState, useEffect } from "react";
import React , {useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Swal from 'sweetalert2';
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

export const MuiCRUDveterinarios = () => {



//*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datos, setDatos] = React.useState([]);
  
  
  // **************************** estados para el formulario
  // id, nombre,usuario ,password ,
  //email ,	rol ,estado ,falta,	halta 
  /*
  id                   integer  NOT NULL  ,
  nombre               char(65)  NOT NULL  ,
  nota                 text    ,
  telefono             char(55)    ,
  email                char(80)    ,
  falta                date    ,
  halta                time   */
 /* *************************************************** */
 // estados para el formulario
 
 const [estado, setEstado] = React.useState("ACTIVO");
/* *************************************************** */
const [nombre, setNombre] = React.useState("")
const [nota, setNota] = React.useState("");
const [telefono, setTelefono] = React.useState("");
const [email, setEmail] = React.useState("");
const [falta, setFalta] = React.useState("0000-00-00");
const [halta, setHalta] = React.useState("00:00:00");
const [id, setId] = React.useState(0);
 
 
  
 
  // estado para controlar el boton modificar en el formulario
  const [validacionModificar, setValidacionModificar] = React.useState(false);
  // guardar el id a modificar
  const [idModificar, setIdModificar] = React.useState(0);
  // CONTROL VENTANA MODAL 
  const [showModal, setShowModal] = React.useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  
  // funcion abre y cierra modal 
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  
  
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  
  // ************ Toggles para  Modal
 
  function toggle(e){
    e.preventDefault();
    setModal(!modal);

  } 
  
  function togglesine(){
       setModal(!modal);
  }  



   useEffect(()=>{
  
    cargarDatos();
   },[])
   
  
   const cargarDatos = async ()=>{
    const respuesta = await axios.get("https://buddy-care-rest-api.onrender.com/veterinarios")
    
    setDatos(respuesta.data);
   }
   
  
  // ********************   agrega registro ********************
  
  const agregarRegistro = async (e)=> {
    e.preventDefault()
    if(nombre.trim().length<1 || telefono.trim().length<1 || email.trim().length<1 ){
     Swal.fire({
        icon: 'error',
        title: 'Complete la informacion requerida',
        text: '',
       
      })
    }else{


   // e.preventDefault();
   
    const date = new Date();
    date.toLocaleDateString('en-GB').split('/').reverse().join('-'); // '20211124'
    await  axios.post("https://buddy-care-rest-api.onrender.com/veterinarios",{
  id:getRandomInt(1111111, 9999999),
  nombre,
  nota,
  telefono,
  email,
  falta:date.toLocaleDateString('en-GB').split('/').reverse().join('-'),
  halta:"00:00:00",      
  

  })
  togglesine();
  cargarDatos();
  
  }

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
  
      axios.delete(`https://buddy-care-rest-api.onrender.com/veterinarios/${id}`)
      cargarDatos();
    
  }
})




    



    }
  
   // **************************************************** Activar la modificacion 
   const activarModificacion = async(id) =>{
    const respuesta = await axios.get(`https://buddy-care-rest-api.onrender.com/veterinarios/${id}`)
   
     // id, nombre,usuario ,password ,
  //email ,	rol ,estado ,falta,	halta 
  setNombre(respuesta.data.nombre)
  setNota(respuesta.data.nota)
  setTelefono(respuesta.data.telefono)
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
    //window.alert(idModificar)
    try{
    if(nombre.trim().length<1 || email.trim().length<1 || telefono.trim().length<1  ){
             Swal.fire({
                icon: 'error',
                title: 'Complete la informacion requerida',
              text: '',
       
             })
    }else{
     
      const date = new Date();
            await  axios.put(`https://buddy-care-rest-api.onrender.com/veterinarios/${idModificar}`,{
                nombre,
                nota,
                telefono,
                email,
                falta:date.toLocaleDateString('en-GB').split('/').reverse().join('-'),
                halta:"00:00:00",   
    
           })
    
          togglesine();
          cargarDatos();
          setValidacionModificar(false)
    }


  } catch (error) {window.alert(error);}



  }

// ****************  COLUMNAS DE LA TABLA ********************
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
              <button className='btn btn-warning btn-sm' onClick={()=>activarModificacion(tableMeta.tableData[tableMeta.rowIndex][2])}>
                Modificar
              </button>
            );
          }
        }
      },

    { name: "id", label: "ID" },
    { name: "nombre",label: "NOMBRE" },
    { name: "telefono",label: "TELEFONO" },
    { name: "email",label: "EMAIL" },
   
]


const darkTheme = createTheme({
     palette: { mode: 'dark',},
      components: { MuiTableCell: { styleOverrides:{ root: {
            padding: '5px',
            size:'small'
           }}
        }},

        typography: {fontSize: 10, },
        
  });

  const options = {
      rowsPerPage: 6,
  };
  


/* tabla base 
id                   integer  NOT NULL  ,
	nombre               char(65)  NOT NULL  ,
	nota                 text    ,
	telefono             char(55)    ,
	email                char(80)    ,
	falta                date    ,
	halta                time    ,
  */




//****************  RENDER - RENDER  -RENDER ******* */
        return (
          <>
            <>
              <p>Veterinarios afiliados al SISTEMA Buddy Care</p>

              <button className="btn btn-success btn-sm" onClick={toggle}>
                AGREGAR VETERINARIO{" "}
              </button>
            </>
            <ThemeProvider theme={darkTheme}>
              <MUIDataTable
                title={"- VETERINARIOS -"}
                data={datos}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
            <>
              {" "}
              <p>(C) 2022 - PF Buddy Care</p>
            </>

            {/* -- PARTE MODAL DEL TEMA ------------------------- */}
            <div
              style={{
                display: "block",
                width: 500,
                padding: 30,
              }}
            >
              <Modal
                isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 10 }}
              >
                <ModalBody>
                  <div className="col-12">
                    <h3 className="text-center">Nuevo/Modifica</h3>

                    <form>
                      <div className="mb-3">
                        <label for="validationCustom01" className="form-label">
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="validationCustom01"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                        <div id="emailHelp" class="form-text">
                          Ingrese el nombre del profesional
                        </div>
                      </div>

                      <div className="mb-3">
                        <label for="validationCustom01" className="form-label">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="validationCustom01"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          required
                        />
                        <div id="emailHelp" class="form-text">
                          Ingrese teléfono{" "}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label for="validationCustom01" className="form-label">
                          E-mail
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id="validationCustom01"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div id="emailHelp" class="form-text">
                          Ingrese el e-mail de veterinario
                        </div>
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
                          value={nota}
                          onChange={(e) => setNota(e.target.value)}
                          required
                        />
                        <div id="emailHelp" class="form-text">
                          Ingrese nota de referencia{" "}
                        </div>
                      </div>

                      <div className="mb-3">
                        {validacionModificar ? (
                          <button
                            className="btn btn-warning btn-sm"
                            type="submit"
                            onClick={(e) => modificarRegistro(e)}
                          >
                            Modificar
                          </button>
                        ) : (
                          <button
                            className="btn btn-success btn-sm"
                            type="submit"
                            onClick={(e) => agregarRegistro(e)}
                          >
                            Agregar
                          </button>
                        )}
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={(e) => toggle(e)}
                        >
                          Cancela
                        </button>
                      </div>
                    </form>
                  </div>
                </ModalBody>
              </Modal>
            </div>
            {/*-------- FIN DE LA PARTE MODAL  ------- */}
          </>
        );

}