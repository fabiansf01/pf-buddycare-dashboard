import React, { useState, useEffect } from 'react';
import ShopImagen from './ShopImagen';
import { homeContainer,newcards,fontdescribe,myButton,therow } from "./ShopLaunch.module.css";
const ShopResultado = (props) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
// ggggggggggggg
  useEffect(() => {
    setTotalPaginas(Math.ceil(props.articulos.length / 8));
  }, [props.articulos]);

  const mostrarArticulos = () => {
    const articulos = props.articulos.slice((paginaActual - 1) * 8, paginaActual * 8);

    if (articulos.length === 0) return null;

    return (
      <React.Fragment>
        <div>
        
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
        
        
        <div className={therow}>
          {articulos.map((articulo) => (
            <ShopImagen key={articulo.id} articulo={articulo} />
          ))}
        </div>
        
        
      </React.Fragment>
    );
  };

  return <React.Fragment>{mostrarArticulos()}</React.Fragment>;
};

export default ShopResultado;
