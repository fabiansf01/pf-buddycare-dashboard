/*import React, { Component } from 'react'

class Buscador extends Component {
   busquedaRef = React.createRef()


obtenerDatos = (e)=>{

// para prevenir formulario vacio
e.preventDefault();

// siempre se pone current y value para acceder al dato del campo
console.log(this.busquedaRef.current.value);
//alert(this.busquedaRef.current.value);

 const termino = this.busquedaRef.current.value;
 this.props.datosBusqueda(termino);



}

    render() { 
        return (

        <form onSubmit={this.obtenerDatos}>

                <div className='row'>

                    <div className='form-group col-md-8'>

                        <input ref={this.busquedaRef} type="text" className='form-control form-contro-lg'
                        placeholder='Busca tu imágen ej: fútbol'/>

                    </div>
                
                    <div className='form-group col-md-4'>
                                <input type="submit" className='btn btn-lg btn-danger btn-block'
                                value="Buscar" />
                    </div>
                
                </div>


        </form>

        );
    }
}
 
export default Buscador;*/

import React from 'react'

const ShopBuscador = (props) => {
   const busquedaRef = React.createRef()

   const obtenerDatos = (e)=>{
    e.preventDefault();
    const termino = busquedaRef.current.value;
    //window.alert(termino)
    props.datosBusqueda(termino);
   }

    return (
        <form onSubmit={obtenerDatos}>
                <div className='row'>
                    <div className='form-group col-md-6'>
                        <input ref={busquedaRef} type="text" className='form-control form-contro-lg'
                        placeholder='ingrese nombre del artículo'/>
                    </div>
                    <div className='form-group col-md-4'>
                        <input type="submit" className='btn btn-lg btn-danger btn-block'
                        value="Buscar" />
                    </div>
                </div>
        </form>
    );
}
 
export default ShopBuscador;
