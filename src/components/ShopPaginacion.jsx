/*import React from 'react'

// no se usa component porque est eva a ser un componente funcional

// no se puede usar this porque es una clase , por eso se usa props
const Paginacion = (props) =>{



return(
<div className="py-3 ">

    <button onClick={props.paginaAnterior} type="button" className="btn btn-info mr-1">&larr; Anterior </button>
    <button onClick={props.paginaSiguiente} type="button" className="btn btn-info ">Siguiente &rarr; </button>
</div>

)

}

export default Paginacion;*/

import React from 'react'

const ShopPaginacion = (props) =>{
  return(
    <div className="py-3 ">
      <button onClick={props.paginaAnterior} type="button" className="btn btn-info mr-1">&larr; AnteriorEEE </button>
      <button onClick={props.paginaSiguiente} type="button" className="btn btn-info ">SiguienteEE &rarr; </button>
    </div>
  )
}

export default ShopPaginacion;
