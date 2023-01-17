

//import React from 'react'
import React, { useState } from 'react';
import { homeContainer,newcards,fontdescribe } from "./MascoLaunch.module.css";

import { Editmascota } from './Editmascota';
// no se usa component porque est eva a ser un componente funcional

// no se puede usar this porque es una clase , por eso se usa props
const MascoImagen = (props) =>{

const {id,nombre,especie,raza,nota,chip,contenido,estado}=props.mascota;

const [editar, setEditar] = useState(false); 
const [modalAbierto, setModalAbierto] = useState(false); 




const activaEdita = () => {
   //window.alert(id)
    //setIdaeditar(idx)
   
    setEditar(true)
    setModalAbierto(true)
    }
   
   

    const cierraModal = (id) => {
        setEditar(false);
        setModalAbierto(false);
      }

return(

        
<div>
    <div>


        {editar && <Editmascota  xid={id} /> }

</div>

<div className = {newcards}>
    <div className=" justify-content-center">

        <div className="card me-3 " style={{ width: '13rem', height:'27rem' }}>
  
         <div className="card-body" >
         <img src={contenido}  className="card-img-top" style={{height: "130px", width: "130px"}} />
           
           <h5 className="card-title">{nombre}</h5>
           <p className={fontdescribe} style={{ lineHeight: "0.5" }} >Ref.: {id} </p>
           <p className={fontdescribe} style={{ lineHeight: "0.5" }} >Especie: {especie.trim()}  Raza: {raza.trim()} </p>
           <p className={fontdescribe} style={{ lineHeight: "0.5" }}>{nota.trim()} </p>
           <hr></hr>
           <p className={fontdescribe}  style={{ lineHeight: "0.3" }} >ESTADO: {estado.trim()}</p>
           <h5 className="card-title">Chip: {chip}</h5>
                    
           <br></br>
           
           <div class="d-flex"> 
           <button className="btn btn-danger  btn-sm mx-1" >ELIMINAR</button>
           <button className="btn btn-secondary  btn-sm mx-1" onClick={() => activaEdita(id)} >Editar</button>
           
           </div>
           <div class="d-flex"> 
           <button className="btn btn-warning  btn-sm mx-1" >Historia Clínica</button>
           <button className="btn btn-info  btn-sm mx-1" >Foto</button>
            </div>
          </div>
        </div>
</div>		


</div>


</div>


       




    )
}
 


export default MascoImagen;
