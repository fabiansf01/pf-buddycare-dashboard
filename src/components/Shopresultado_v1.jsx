import React, { useState, useEffect } from 'react';
import ShopImagen from './ShopImagen';

const ShopResultado = (props) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    setTotalPaginas(Math.ceil(props.articulos.length / 4));
  }, [props.articulos]);

  const mostrarArticulos = () => {
    const articulos = props.articulos.slice((paginaActual - 1) * 4, paginaActual * 4);

    if (articulos.length === 0) return null;

    return (
      <React.Fragment>
        <div>
        <div className="col-12 p-5 row">
          {paginaActual > 1 && (
            <button
              onClick={() => setPaginaActual(paginaActual - 1)}
              className="btn btn-success mr-2"
            >
              Anterior
            </button>
          )}
          {paginaActual < totalPaginas && (
            <button
              onClick={() => setPaginaActual(paginaActual + 1)}
              className="btn btn-success"
            >
              SiguienteEEEEE
            </button>
          )}
        </div>





        </div>
        
        
        <div className="col-12 p-5 row">
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
