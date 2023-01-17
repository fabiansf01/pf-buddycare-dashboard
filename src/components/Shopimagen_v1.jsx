/*import React from 'react'

// no se usa component porque est eva a ser un componente funcional

// no se puede usar this porque es una clase , por eso se usa props
const Imagen = (props) =>{
// se descontructura la matriz
const {largeImageURL,likes,previewURL,tags, views}=props.imagen;
    return(

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top" />
                <div className="card-body">
                    <p classNme="card-text">{likes} Me gusta </p>
                    <p classNme="card-text">{views} Vistas </p>
                    <a href={largeImageURL} target="_blank" className="btn btn-primary btn-block">Ver imagen</a>
                    
                    </div>
            </div>
        </div>
    )
}
 


export default Imagen;*/

import React from 'react'
import { homeContainer,newcards } from "./ShopLaunch.module.css";
// no se usa component porque est eva a ser un componente funcional

// no se puede usar this porque es una clase , por eso se usa props
const ShopImagen = (props) =>{
// se descontructura la matriz


/*{
    "id": 3,
    "nombre": "COLLAR CHERRY PREMIUM                                            ",
    "rubro": 4,
    "descripcion": "DESCRIPCION  DE COLLAR CHERRY PREMIUM",
    "fotos": "FOTO DE  COLLAR CHERRY PREMIUM",
    "id_vet": 3,
    "precio": "3630.73",
    "stock": 78,
    "ptoped": 68,
    "ptovta": 68,
    "overstock": "S",
    "evento": "SEV                      ",
    "falta": "2022-12-15",
    "halta": "00:00:00",
    "fmodif": "2022-12-15",
    "hmodif": "00:00:00",
    "id_operador": 666,
    "estado": "ACTIVO              ",
    "contenido": "https://www.fpsoft.com.ar/pfsubefotos/archivos/63b7274534123COLLAR CHERRY PREMIUM.jpg"
},*/





const {nombre,descripcion,precio,stock, contenido}=props.articulo;
    return(

        <div className="card" style={{ width: "25rem", height: "20rem" }}>
            <img src={contenido}  className="card-img-top" style={{height: "50px", width: "50px"}}/>
            <div className="card-body">
               
                <div className="card-body">
                    <p className="card-text">{nombre}</p>
                    <p className="card-text">{descripcion}  </p>
                    <p className="card-text">Precio $:{precio}  </p>
                    
                    
                    <a href={contenido} target="_blank" className="btn btn-primary btn-block">Ver imagen</a>
                    
                    </div>
            </div>
        </div>
    )
}
 


export default ShopImagen;
