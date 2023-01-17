//import { useState, useEffect } from "react";
import React , {useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Swal from 'sweetalert2';
import Gestoradjuntos from './Gestoradjuntos';



import { NavLink, useNavigate, Navigate,BrowserRouter, Route, Routes } from 'react-router-dom';
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









export const MuiCRUDarticulos = () => {
  // localStorage.removeItem('adjorigen');
  // localStorage.removeItem('adjid');

  /* id                   integer  NOT NULL  ,
 nombre               char(65)  NOT NULL  ,
 rubro                integer  NOT NULL  ,
 descripcion          text  NOT NULL  ,
 fotos                text    ,
 id_vet               integer  NOT NULL  ,
 precio               decimal  NOT NULL  ,
 stock                integer  NOT NULL  ,
 ptoped                integer  NOT NULL  ,
 ptovta                integer  NOT NULL  ,
 overstock             char(1)  NOT NULL  ,
 evento               char(25)    ,
 falta                date  NOT NULL  ,
 halta                time  NOT NULL  ,
 fmodif               date  NOT NULL  ,
 hmodif               time  NOT NULL  ,
 id_operador          integer  NOT NULL  ,
 estado               char(20)  */

  //*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datos, setDatos] = React.useState([]);
  // estados para el formulario

  const [id, setId] = React.useState(0);
  const [fotos, setFotos] = React.useState("");
  const [rubro, setRubro] = React.useState(0);
  const [nombre, setNombre] = React.useState("");
  const [id_vet, setIdVet] = React.useState(0);
  const [descripcion, setDescripcion] = React.useState("");

  const [precio, setPrecio] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [ptoped, setPtoped] = React.useState(0);
  const [ptovta, setPtovta] = React.useState(0);
  const [overstock, setOverstock] = React.useState("N");
  const [evento, setEvento] = React.useState("");
  const [falta, setFalta] = React.useState("");
  const [halta, setHalta] = React.useState("");
  const [fmodif, setFmodif] = React.useState("");
  const [hmodif, setHmodif] = React.useState("");
  const [id_operador, setIdoperador] = React.useState(0);
  const [estado, setEstado] = React.useState("ACTIVO");

  /* *************************************************** */

  // estado para controlar el boton modificar en el formulario
  const [validacionModificar, setValidacionModificar] = React.useState(false);
  // guardar el id a modificar
  const [idModificar, setIdModificar] = React.useState(0);
  // CONTROL VENTANA MODAL
  const [showModal, setShowModal] = React.useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(false);
  // ***** CONTROL DEL MODULO ADJUNTOS  **** //
  const [adjuntos, setAdjuntos] = React.useState(false);

  const [rubros, setRubros] = React.useState([]);

  // funcion abre y cierra modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);



  const cargarRubros = async ()=>{
    const elQueryrub={"myQuery":`select id,descripcion from pfvet_rubros order by descripcion;`}
    const respuesta = await axios.post("https://buddy-care-rest-api.onrender.com/query",elQueryrub)
    console.log(respuesta)
    
    setRubros(respuesta.data);
   }
  





  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Toggle for Modal
  // const toggle = () => setModal(!modal);
  function toggle(e) {
    e.preventDefault();
    setModal(!modal);
  }

  function togglesine() {
    setModal(!modal);
  }

  useEffect(() => {
    cargarDatos();
    cargarRubros();
    localStorage.setItem("adjorigen", "GENERAL,666");
  }, []);

  const cargarDatos = async () => {
    let xveterinaria = localStorage.getItem("profileid");
      const laveterinaria = parseInt(xveterinaria);
      const elQueryvet ={"myQuery":`select * from pfvet_articulos where id_vet = ${laveterinaria} ;`};
    //window.alert(elQueryvet.myQuery)
      const respuesta = await axios.post(
      "https://buddy-care-rest-api.onrender.com/query",elQueryvet
    );
    console.log(respuesta);
    setDatos(respuesta.data);
  };

  // ********************   agrega registro ********************

  const agregarRegistro = async (e) => {
    try{
    if (descripcion.length < 1  || nombre.length < 1  || precio<=0) {
      Swal.fire({
        icon: "error",
        title: "Complete la informacion requerida",
        text: "",
      });
    } else {
      e.preventDefault();
      const date = new Date();
      
      
      /*falta: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
      halta: "00:00:00",
      fmodif: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
      hmodif: "00:00:00",*/


      let xveterinaria = localStorage.getItem("profileid");
      const laveterinaria = parseInt(xveterinaria);
      await axios.post("https://buddy-care-rest-api.onrender.com/articulos", {
        id: getRandomInt(1111111, 9999999),
        nombre,
        rubro,
        descripcion,
        fotos:"",
        id_vet:laveterinaria,
        precio,
        stock,
        ptoped,
        ptovta,
        overstock,
        evento: "",
        falta: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
      halta: "00:00:00",
      fmodif: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
      hmodif: "00:00:00",
        id_operador:0,
        estado,


        

      });
      togglesine();
      cargarDatos();
    }

  } catch (error) {
    // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
    window.alert(error);
  }
  };

  //    ******************* ABRE GESTION DE ADJUNTOS  **********//
  const abreAdjuntos = () => {
    setAdjuntos(true);
  };

  // ***************************************    elimina registro
  const eliminarRegistro = async (id) => {
    Swal.fire({
      title: "Está seguro de borrar este registro  ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "CANCELAR",
      // confirmButtonText: 'SI,  borrar !!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `https://buddy-care-rest-api.onrender.com/articulos/${id}`
        );
        cargarDatos();
      }
    });
  };

  // **************************************************** Activar la modificacion
  const activarModificacion = async (id) => {
    /* id                   integer  NOT NULL  ,
 nombre               char(65)  NOT NULL  ,
 rubro                integer  NOT NULL  ,
 descripcion          text  NOT NULL  ,
 fotos                text    ,
 id_vet               integer  NOT NULL  ,
 precio               decimal  NOT NULL  ,
 stock                integer  NOT NULL  ,
 ptoped                integer  NOT NULL  ,
 ptovta                integer  NOT NULL  ,
 overstock             char(1)  NOT NULL  ,
 evento               char(25)    ,
 falta                date  NOT NULL  ,
 halta                time  NOT NULL  ,
 fmodif               date  NOT NULL  ,
 hmodif               time  NOT NULL  ,
 id_operador          integer  NOT NULL  ,
 estado               char(20)  */

    const respuesta = await axios.get(
      `https://buddy-care-rest-api.onrender.com/articulos/${id}`
    );

    setNombre(respuesta.data.nombre);
    setRubro(respuesta.data.rubro);
    setDescripcion(respuesta.data.descripcion);
    setFotos(respuesta.data.fotos);
    setIdVet(respuesta.data.id_vet);
    setPrecio(respuesta.data.precio);
    setPtovta(respuesta.data.ptovta);
    setPtoped(respuesta.data.ptoped);
    setOverstock(respuesta.data.overstock);
    setEvento(respuesta.data.evento);
    setFalta(respuesta.data.falta);
    setHalta(respuesta.data.halta);
    setFmodif(respuesta.data.fmodif);
    setHmodif(respuesta.data.hmodif);
    setIdoperador(respuesta.data.id_operador);
    setEstado(respuesta.data.estado);

    setValidacionModificar(true);
    setIdModificar(id);
    togglesine();
  };

  // ***************************   modifica registro
  const modificarRegistro = async (e) => {
    e.preventDefault();
    if (descripcion.trim().length < 1  || nombre.trim().length < 1  || precio<=0) {
      Swal.fire({
        icon: "error",
        title: "Complete la informacion requerida",
        text: "",
      });
    } else {
      const date = new Date();

      let xveterinaria = localStorage.getItem("profileid");
      const laveterinaria = parseInt(xveterinaria);
      await axios.put(
        `https://buddy-care-rest-api.onrender.com/articulos/${idModificar}`,
        {
          nombre,
          rubro,
          descripcion,
          fotos,
          id_vet: laveterinaria,
          precio,
          stock,
          ptoped,
          ptovta,
          overstock,
          evento: "",
          falta: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
          halta: "00:00:00",
          fmodif: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
          hmodif: "00:00:00",
          id_operador:0,
          estado,
        }
      );

      togglesine();
      cargarDatos();
      setValidacionModificar(false);
    }
  };

  const navigate = useNavigate();

  const routeChangeAdj = async (id) => {
    let cadena = "ARTICULOS" + "," + id.toString();
    localStorage.setItem("adjorigen", cadena);
    //localStorage.setItem('adjid',id.toString() );

    //window.alert(localStorage.getItem('adjorigen' ))
    //window.alert(localStorage.getItem('adjid' ))
    //let path = '/adjb';
    let path = "/adjuntosvet";
    navigate(path);
  };

  //3 - Definimos las columns
  const columns = [
    {
      name: "Borrar",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                eliminarRegistro(tableMeta.tableData[tableMeta.rowIndex][2])
              }
            >
              Borrar
            </button>
          );
        },
      },
    },

    {
      name: "Modificar",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="btn-group">
              <button
                className="btn btn-warning btn-sm"
                onClick={() =>
                  activarModificacion(
                    tableMeta.tableData[tableMeta.rowIndex][2]
                  )
                }
              >
                Modificar
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={() =>
                  routeChangeAdj(tableMeta.tableData[tableMeta.rowIndex][2])
                }
              >
                ADJ
              </button>
            </div>
          );
        },
      },
    },

    { name: "id", label: "ID" },
    { name: "nombre", label: "NOMBRE" },
    { name: "stock", label: "STOCK" },
    { name: "precio", label: "PRECIO" },
  ];

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const options = {
    rowsPerPage: 6,
  };

 
 
 
 
  //4 - renderizamos la datatable
  return (
    <>
      <>
        <p>-- Artículos de Veterinaria</p>

        <button className="btn btn-success btn-sm" onClick={toggle}>
          AGREGAR ARTICULO{" "}
        </button>
      </>
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable
          title={"- Artículos -"}
          data={datos}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      <>
        {" "}
        <p>(C) 2022 - PF Buddy Care</p>
      </>

      {/* -- PARTE MODAL DEL TEMA ------------------------- */}
      <div
        style={{
          display: "block",
          width: 500,
          padding: 30,
        }}
      >
        <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 10 }}>
          <ModalBody>
            <div className="col-12">
              <h3 className="text-center">Nuevo/Modifica</h3>

              <form>
                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    (*) Nombre de artículo/servicio
                  </div>
                </div>

               {/*} <div className="mb-3">
                  <select name="selectRubro" onChange={(e) => setRubro(e.target.value)}>
                    <option value="" disabled selected>
                      Selecciona un rubro
                    </option>
                    {rubros.map((rubro) => (
                      <option value={rubro.id}>{rubro.descripcion}</option>
                    ))}
                  </select>
                    </div>*/}


                <div className="mb-3">
                  <label className="form-label">Rubro</label>
                  <select
                    className="form-control"
                    onChange={(e) => setRubro(e.target.value)}
                  >
                    <option value={rubro} >rubro guardado </option>
                    {rubros.map((rubro) => (
                      <option value={rubro.id}>{rubro.descripcion}</option>
                    ))}

                  </select>
                  <div id="emailHelp" class="form-text">
                    Rubro del artículo
                  </div>
                </div>



                {/*   <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Rubro
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={rubro}
                    onChange={(e) => setRubro(e.target.value)}
                    required
                  />

                  <div id="emailHelp" class="form-text">
                    (*) Seleccione el rubro
                  </div>
                  </div>*/}

                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Nota
                  </label>
                  <textarea
                    className="form-control"
                    type="textarea"
                    class="form-control form-control-sm"
                    id="validationCustom01"
                    style={{ height: "80px", width: "450px", resize: "both" }}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    Descripción del artículo
                  </div>
                </div>

                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Precio:
                  </label>
                  <input
                    type="number"
                    placeholder="1.0"
                    step="0.50"
                    min="1"
                    max="1000000"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    (*) Precio de venta
                  </div>
                </div>

                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Stock:
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    step="1"
                    min="1"
                    max="1000000"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    (*) Stock ACTUAL
                  </div>
                </div>

                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Punto de VENTA:
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    step="1"
                    min="1"
                    max="1000000"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={ptovta}
                    onChange={(e) => setPtovta(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    (*) Debajo de este valor se emitirá aviso de cantidad mínima
                    para correcta comercialización
                  </div>
                </div>

                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Punto de PEDIDO:
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    step="1"
                    min="1"
                    max="1000000"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={ptoped}
                    onChange={(e) => setPtoped(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    (*) Debajo de este valor se emitirá aviso de REPOSICION DE
                    STOCK
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Overstock</label>
                  <select
                    className="form-control"
                    onChange={(e) => setOverstock(e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="N">N</option>
                  </select>
                  <div id="emailHelp" class="form-text">
                    Si está seleccionado S es posible una venta sin control de
                    stock, si está en N, no permite realizar compra por stock
                    CERO
                  </div>
                </div>

                {/*} <div className="mb-3">
               <label  className="form-label">Estado</label>
               <input type="text" className="form-control " onChange={(e)=>setEstado(e.target.value)} />
             </div>*/}

                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-control"
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INHABILITADO">INHABILITADO</option>
                  </select>
                  <div id="emailHelp" class="form-text">
                    Seleccione el estado del artículo
                  </div>
                </div>

                <div className="mb-3">
                  {validacionModificar ? (
                    <button
                      className="btn btn-warning btn-sm"
                      type="submit"
                      onClick={(e) => modificarRegistro(e)}
                    >
                      Modificar
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      type="submit"
                      onClick={(e) => agregarRegistro(e)}
                    >
                      Agregar
                    </button>
                  )}
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={(e) => toggle(e)}
                  >
                    Cancela
                  </button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
      {/*-------- FIN DE LA PARTE MODAL  ------- */}

      <div></div>
    </>
  );
}