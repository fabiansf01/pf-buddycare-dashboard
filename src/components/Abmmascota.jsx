//import { useState, useEffect } from "react";
import React , {useEffect } from 'react'

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

export const Abmmascota = () => {
  


  // estado para controlar el boton modificar en el formulario
  const [validacionModificar, setValidacionModificar] = React.useState(false);


  //*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datosabm, setDatos] = React.useState([]);
  
  
  // **************************** estados para el formulario
  // id, nombre,usuario ,password ,
  //email ,	rol ,estado ,falta,	halta 
  
  //const [nombre, setNombre] = React.useState("");
  //const [usuario, setUsuario] = React.useState("");
  //const [password, setPassword] = React.useState("");  
  //const [email, setEmail] = React.useState("");  
  //const [rol, setRol] = React.useState("");
  //const [estado, setEstado] = React.useState("");
 /* *************************************************** */
 // estados para el formulario
 
 
/* *************************************************** */



const [nombre, setNombre] = React.useState("");
const [id_cliente, setIdcliente] = React.useState(0);
const [especie, setEspecie] = React.useState("");
const [raza, setRaza] = React.useState("");
const [edad, setEdad] = React.useState(0);
const [peso, setPeso] = React.useState(0);
const [nota, setNota] = React.useState("");
const [estado, setEstado] = React.useState("VIVA");
const [chip, setChip] = React.useState("");
const [id_madre, setIdmadre] = React.useState(0);
const [id_padre, setIdpadre] = React.useState(0);
const [adjuntos, setAdjuntos] = React.useState("");
const [falta, setFalta] = React.useState("0000-00-00");
const [halta, setHalta] = React.useState("00:00:00");
const [id, setId] = React.useState(0);
 

  
  // guardar el id a modificar
  const [idModificar, setIdModificar] = React.useState(0);
  // CONTROL VENTANA MODAL 
  const [showModal, setShowModal] = React.useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(true);
  const [xmodal, setXmodal] = React.useState(false);
  
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

   





  function queHago() {
    //window.alert(laaccion)
    //setXmodal(true);
    //if(laaccion=="ALTA"){
    let doyalta = false;
    setValidacionModificar(doyalta);
    //}else{
    //}
  }


//queHago()


   
  
   const cargarDatos = async ()=>{
    //window.alert("cargar datos")
   /* if (laaccion="ALTA"){
      const doyalta = false;
      setValidacionModificar(doyalta);
    }else{
      const doyalta = true;
      setValidacionModificar(doyalta);
    }*/
    toggle(!modal)
//window.alert(validacionModificar)

    const respuesta = await axios.get("https://buddy-care-rest-api.onrender.com/mascotas")
    //window.alert("datos cargados")
    
   
    setDatos(respuesta.data);
   }
   
  
  // ********************   agrega registro ********************
  
  const agregarRegistro = async (e)=> {
    e.preventDefault()
    try{
    if(nombre.trim().length<1 || especie.trim().length<1 || raza.trim().length<1 ){
     Swal.fire({
        icon: 'error',
        title: 'Complete la informacion requerida',
        text: '',
       
      })
    }else{


   // e.preventDefault();
 /*  id                   integer  NOT NULL  ,
	id_cliente           integer  NOT NULL  ,
	nombre               char(65)  NOT NULL  ,
	especie              char(65)  NOT NULL  ,
	raza                 char(65)  NOT NULL  ,
	edad                 integer  NOT NULL  ,
	peso               integer    ,
	estado               char(20)  NOT NULL  ,
	id_madre             integer    ,
	id_padre             integer    ,
	adjuntos             text    ,
	nota                 text    ,
	chip                 integer    ,
	falta                date    ,
	halta                time    ,*/

    const date = new Date();
    date.toLocaleDateString('en-GB').split('/').reverse().join('-'); // '20211124'
    await  axios.post("https://buddy-care-rest-api.onrender.com/mascotas",{
  id:getRandomInt(1111111, 9999999),
  id_cliente:666, 
	nombre,  
	especie,   
	raza ,    
	edad:1 ,	 
	peso ,   
	estado ,    
	id_madre:0 ,  
	id_padre:0 , 
	adjuntos:"",	
	nota	,	
	chip:0 ,	
	falta:date.toLocaleDateString('en-GB').split('/').reverse().join('-'),
  halta:"00:00:00",      
  
  
  })




  togglesine();
  cargarDatos();
  
  }

} catch (error) {
  // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
  window.alert(error);
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
  
      axios.delete(`https://buddy-care-rest-api.onrender.com/mascotas/${id}`)
      cargarDatos();
    
  }
})


    }
  
   // **************************************************** Activar la modificacion 
   const activarModificacion = async(id) =>{
    const respuesta = await axios.get(`https://buddy-care-rest-api.onrender.com/mascotas/${id}`)
   
     // id, nombre,usuario ,password ,
  //email ,	rol ,estado ,falta,	halta 
  
  
  setIdcliente(respuesta.data.id_cliente)
  setNombre(respuesta.data.nombre)
  setRaza(respuesta.data.raza)
  setEdad(respuesta.data.edad)
  setEstado(respuesta.data.estado)
  setIdmadre(respuesta.id_madre)
  setAdjuntos(respuesta.adjuntos)
  setNota(respuesta.data.nota)
  setChip(respuesta.data.chip)
   setFalta(respuesta.data.falta)
  setHalta(respuesta.data.chip)

    setValidacionModificar(true)
    setIdModificar(id)
    togglesine();
   } 
  
  
  // ***************************   modifica registro
  const modificarRegistro = async (e)=> {
    e.preventDefault();
    if(nombre.trim().length<1 || especie.trim().length<1 || raza.trim().length<1  ){
             Swal.fire({
                icon: 'error',
                title: 'Complete la informacion requerida',
              text: '',
       
             })
    }else{
        const date = new Date();
            await  axios.put(`https://buddy-care-rest-api.onrender.com/mascotas/${idModificar}`,{
       id_cliente:666, 
	nombre,  
	especie,   
	raza ,    
	edad ,	 
	peso ,   
	estado ,    
	id_madre:0 ,  
	id_padre:0 , 
	adjuntos:"",	
	nota	,	
	chip ,	
	falta:date.toLocaleDateString('en-GB').split('/').reverse().join('-'),
  halta:"00:00:00",   
           })
    
          togglesine();
          cargarDatos();
          setValidacionModificar(false)
    }

  }



 /* TABLA DE MASCOTAS DE CLIENTES
----------------------------------
	id   
	id_cliente ID DEL CLIENTE  (DUEÑO)
	nombre     NOMBRE DE LA MASCOTA 
	especie    ESPECIE DE LA MASCOTA	
	raza       RAZA
	edad 	   EDAD EN AÑOS
	peso       PESO EN KILOS
	estado     ESTADO (VIVA / MUERTA / EXTRAVIADA)
	id_madre   SI LA MADRE DE LA MASCOTA ESTA REGISTRADA EN ESTA APP , SU ID
	id_padre   SI LA PADRE DE LA MASCOTA ESTA REGISTRADA EN ESTA APP , SU ID 
	adjuntos	FOTOS DE LA MASCOTA
	nota		NOTA INTERNA DE LA MASCOTA
	chip 		CHIP DE LA MASCOTA SI LO TUVIERA
	falta 		FECHA DE ALTA
	halta		HORA DE ALTA
*/

// toggle={toggle}




//****************  RENDER - RENDER  -RENDER ******* */
        return (
          <>
          <> 
        
          </>
 
          {/* -- PARTE MODAL DEL TEMA ------------------------- */}        
<div style={{
			display: 'block', width: 500, padding: 30
		}}>
		
			<Modal isOpen={modal}
				toggle={toggle}
				modalTransition={{ timeout: 3 }}>
				<ModalBody>
					
        <div className='col-12'>
                  <h3 className='text-center'>Nueva Mascota</h3>    
                  <form >
              
              <div id="emailHelp" class="form-text">
                    Cuando completes este formulario, recuerda ingresar la 
                    foto de tu mascota desde la opción FOTO en su ficha 
                  </div>
                <br></br>

              <div className="mb-3">
                        <label for="validationCustom01"  className="form-label">Nombre</label>
                        <input type="text" className="form-control form-control-sm" id="validationCustom01" value={nombre} onChange={(e)=>setNombre(e.target.value) } required />
                        <div id="emailHelp" class="form-text">(*)Como se llama tu mascota ??</div>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
 
              <div className="mb-3">
                        <label for="validationCustom01"  className="form-label">Especie</label>
                        <input type="text" className="form-control form-control-sm" id="validationCustom01" value={especie} onChange={(e)=>setEspecie(e.target.value) } required />
                        <div id="emailHelp" class="form-text">(*) A que especie pertenece (Ej. gato, perro, reptil,ave,etc.) ?? </div>
              </div>
              
              <div className="mb-3">
                        <label for="validationCustom01"  className="form-label">Raza</label>
                        <input  type="text"  className="form-control form-control-sm" id="validationCustom01" value={raza} onChange={(e)=>setRaza(e.target.value) } required />
                        <div id="emailHelp" class="form-text">(*) A que raza pertenece (Ej.Siamés, Labrador, Tortuga, Canario, etc.) ?? </div>
              </div>
              </div>
              

              <div style={{display: "flex", justifyContent: "space-between"}}>
              <div className="mb-3">
                        <label for="validationCustom01"  className="form-label">Edad</label>
                        <input type="email" className="form-control form-control-sm" id="validationCustom01" value={edad} onChange={(e)=>setEdad(e.target.value) } required />
                        <div id="emailHelp" class="form-text">Edad en años de tu mascota</div>
              </div>
              
               <div className="mb-3">
                        <label for="validationCustom01"  className="form-label">Peso</label>
                        <input type="email" className="form-control form-control-sm" id="validationCustom01" value={peso} onChange={(e)=>setPeso(e.target.value) } required />
                        <div id="emailHelp" class="form-text">Peso en Kg. de tu mascota</div>
              </div>
              
              </div>

              <div className="mb-3">
                        <label  className="form-label">Estado</label>
                        <select className="form-control" onChange={(e)=>setEstado(e.target.value)}>
                        <option value="VIVA" >VIVA</option>
                        <option value="EXTRAVIADA">EXTRAVIADA</option>   
                        <option value="MUERTA">MUERTA</option>   
                         </select>
                     <div id="emailHelp" class="form-text">En que estado se encuentra tu mascota ??</div>
     
              </div>

               <div className="mb-3">
                        <label for="validationCustom01"  className="form-label">Chip:</label>
                        <input type="text" className="form-control form-control-sm" id="validationCustom01" value={chip} onChange={(e)=>setChip(e.target.value) } />
                        <div id="emailHelp" class="form-text">Si tu mascota tiene CHIP, coloca su ID </div>
              </div>
              <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Descripcion:
                  </label>
                  <textarea
                    className="form-control"
                    type="textarea"
                    class="form-control form-control-sm"
                    id="validationCustom01"
                    style={{ height: "50px", width: "430px", resize: "both" }}
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                   
                  />
                  <div id="emailHelp" class="form-text">
                    Describe a tu mascota 
                  </div>
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

            </>
        )

}