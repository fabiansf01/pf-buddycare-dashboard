//import logo from './logo.svg';
//import './App.css';


/*import { Component } from "react";
import Buscador from "./componentes/Buscador.js"
import Resultado from "./componentes/Resultado.js"

class App extends Component{
state = {
  termino:"",
  imagenes: [],
  pagina: ""
}

paginaAnterior=()=>{

  // leer el state de pagina actual
let pagina = this.state.pagina;
// previene pagina en negativo
if(pagina===1) return null;

// restar uno a l apagina actual
pagina -= 1;
// agregar el cambio al state
console.log("pagina",pagina)
this.setState.pagina({pagina:pagina}, ()=>{this.consultarApi()})
  
}

paginaSiguiente=()=>{
// leer el state de pagina actual
let pagina = this.state.pagina;
// sumar uno a l apagina actual
pagina += 1;
console.log("pagina",pagina)
// agregar el cambio al state
this.setState.pagina({pagina:pagina}, ()=>{this.consultarApi()})

}

consultarApi = ()=>{
  
  let mitermino = this.state.termino.trim();
  //console.log("el termino xxxxxxxxxx",mitermino)
  let pagina=this.state.pagina;

  const url ='https://pixabay.com/api/?key=30788283-350b77ae57c419596334f874e&q='+mitermino+'&per_page=30&page='+pagina;

  // console.log(url);

  fetch(url)
  .then(respuesta =>respuesta.json())
  .then(resultado=>this.setState({imagenes:resultado.hits})) // interesa solo la popiedad hits
}


datosBusqueda = (termino)=>{
  this.setState({termino:termino,pagina:1},()=>{this.consultarApi()})
  

}


render(){
  
  return (
    <div className="app container">
    <div className="jumbotron">
      
      <p className="lead text-center"> Buscador de imágenes BY FPSOFT </p>
    
        <Buscador
         datosBusqueda={this.datosBusqueda}/>
    
    </div>
    <div className="row justify-content-center">
     <Resultado
     imagenes={this.state.imagenes} 
     paginaAnterior={this.paginaAnterior}
     paginaSiguiente={this.paginaSiguiente}
     />
     </div>
    </div>
  );
}
}

export default App;*/


import { useState, useEffect } from "react";

import styles from "./ShopLaunch.module.css";
//import Buscador from "./componentes/Buscador.js"
//import Resultado from "./componentes/Resultado.js"
import ShopBuscador from "./ShopBuscador";
import Shresult from "./Shresult";
import axios from "axios";
import Swal from "sweetalert2";

const ShopLaunch = () => {
  const [termino, setTermino] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [pagina, setPagina] = useState("");

  const paginaAnterior = () => {
    if (pagina === 1) return null;
    setPagina(pagina - 1);
    consultarApi();
  };

  const paginaSiguiente = () => {
    setPagina(pagina + 1);
    consultarApi();
  };

  //const consultarApi = () => {
   
    /*const url =
      "https://pixabay.com/api/?key=30788283-350b77ae57c419596334f874e&q=" +
      mitermino +
      "&per_page=30&page=" +
      pagina;

    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => setImagenes(resultado.hits));*/


      
      const consultarApi = async () => {
        let mitermino = termino.trim();
        //window.alert(mitermino)
        let xtermino = mitermino.toUpperCase();
        const endpoint = "https://buddy-care-rest-api.onrender.com/query"
        const elQueryb ={"myQuery":`SELECT pfvet_articulos.*, pfvet_adjuntos.contenido from pfvet_articulos inner join pfvet_adjuntos on pfvet_articulos.id=pfvet_adjuntos.id_originador where trim(pfvet_adjuntos.originador)='ARTICULOS' and pfvet_articulos.nombre like '%${xtermino}%'; `};
        //window.alert(elQueryb.myQuery)
        //setLoading(true);
       try{
        await axios.post(endpoint,elQueryb).then((response) => {
        // await axios.get(endpoint).then((response) => {
              const data = response.data
         // window.alert(data[0].nombre)
         // window.alert(elQueryb.myQuery)  
         //window.alert(data) 
         setArticulos(data);



            });

          } catch (error) {
            // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
            window.alert(error);
          }

  };


/*<ShopResultado
          articulos={articulos}
          paginaAnterior={paginaAnterior}
          paginaSiguiente={paginaSiguiente}
        />*/

  const datosBusqueda = (termino) => {
    setTermino(termino);
    setPagina(1);
    consultarApi();
  };

  //<div className="app container text-sm"></div>
  return (
    <div>
      <div>
        
        <ShopBuscador datosBusqueda={datosBusqueda} />
      </div>
      <div className="row justify-content-center">
        <Shresult
          articulos={articulos}
          
        />
      </div>
    </div>
  );
};

export default ShopLaunch;

