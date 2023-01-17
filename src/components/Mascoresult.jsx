import React, { useState, useEffect } from 'react';
//import ShopImagen from './ShopImagen';
import { homeContainer,newcards,fontdescribe,myButton,therow} from "./MascoLaunch.module.css";
import axios from "axios";
import MascoImagen from './MascoImagen';
import { Abmmascota } from './Abmmascota';



const Mascoresult = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [mascotasb, setMascotas] = useState([]);  
  const [alta, setAlta] = useState(false); 

  // ggggggggggggg
 



useEffect(() => {
    
    consultarApi();
    setTotalPaginas(Math.ceil(mascotasb.length / 4));
 
}, []);

 




const consultarApi = async () => {
     const endpoint = "https://buddy-care-rest-api.onrender.com/query"
    const elQueryb ={"myQuery":`SELECT pfvet_mascotas.*, pfvet_adjuntos.contenido FROM pfvet_mascotas left JOIN pfvet_adjuntos ON pfvet_mascotas.id = pfvet_adjuntos.id_originador  AND trim(pfvet_adjuntos.originador) = 'MASCOTA' ; `};
    //window.alert(elQueryb.myQuery)
    //setLoading(true);
   try{
    await axios.post(endpoint,elQueryb).then((response) => {
    // await axios.get(endpoint).then((response) => {
          const data = response.data
     // window.alert(data[0].nombre)
     // window.alert(elQueryb.myQuery)  
     //window.alert(data) 
     setMascotas(data);



        });

      } catch (error) {
        // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
        window.alert(error);
      }

};


const activaAlta = () => {
setAlta(true)
}




const mostrarMascotas = () => {
    const mascotas = mascotasb.slice((paginaActual - 1) * 4, paginaActual * 4);

    if (mascotas.length === 0) return null;

    return (
      <React.Fragment>
        <div>
        
        <div>
        <button className="btn btn-success mx-2" onClick={activaAlta} >Agregar una Mascota</button>
        </div>

        <div>
        {alta && <Abmmascota />}

        </div>



        <div className="container" style={{ width: '800px' }}>
          {paginaActual > 1 && (
            <button 
              onClick={() => setPaginaActual(paginaActual - 1)}
              className={myButton + " mx-2"}
            >
               -- Anterior
            </button>
          )}
          {paginaActual < totalPaginas && (
            <button
              onClick={() => setPaginaActual(paginaActual + 1)}
              className={myButton + " mx-2"}
            >
              Siguiente --
            </button>
          )}
        </div>


              <br></br>
              <br></br>


        </div>
        
       
        
        <div className={therow  }>
          {mascotas.map((mascota) => (
            <MascoImagen key={mascota.id} mascota={mascota}  />
          ))}
        </div>
        
        
      </React.Fragment>
    );
  };

  return <React.Fragment>{mostrarMascotas()}</React.Fragment>;
};

export default Mascoresult;
