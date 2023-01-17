/*import React, { Component } from 'react'
import Imagen from "./Imagen"
import Paginacion from './Paginacion';

class Resultado extends Component {
    
    mostrarImagenes = ()=>{
        
        const imagenes = this.props.imagenes;
        
        if (imagenes.length===0) return null;
        //console.log(this.props.imagenes);

            return(
                <React.Fragment>
                    <div className="col-12 p-5 row">

                        {imagenes.map(imagen=>(
                          <Imagen
                          key={imagen.id}
                          imagen={imagen}
                          />  
                        ))}

                    </div>
                    <Paginacion
                    paginaAnterior={this.props.paginaAnterior}
                    paginaSiguiente={this.props.paginaSiguiente}
                    />
                </React.Fragment>
            )

    }


    render() { 
        return (
           <React.Fragment>
            { this.mostrarImagenes() }
            
            </React.Fragment>
        );
    }
}
 
export default Resultado;*/



import React from 'react'
//import Imagen from "./Imagen"
//import Paginacion from './Paginacion';
import ShopImagen from './ShopImagen';
import ShopPaginacion from './ShopPaginacion';

const ShopResultado = (props) => {
    
    const mostrarArticulos = ()=>{
        
        const articulos = props.articulos;
        
        if (articulos.length===0) return null;
        //console.log(props.imagenes);

            return(
                <React.Fragment>
                    <div className="col-12 p-5 row">

<h1> prueba vacia </h1>
                        {articulos.map(articulo=>(
                          <ShopImagen
                          key={articulo.id}
                          
                          
                          articulo={articulo}
                          />  
                       ))}



                    </div>
                    <ShopPaginacion
                    paginaAnterior={props.paginaAnterior}
                    paginaSiguiente={props.paginaSiguiente}
                    />
                </React.Fragment>
            )

    }


    return (
       <React.Fragment>
        { mostrarArticulos() }
            
       </React.Fragment>
    );
}
 
export default ShopResultado;
