//import { useState, useEffect } from "react";
import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";
import Gestoradjuntos from "./Gestoradjuntos";

import {
  NavLink,
  useNavigate,
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
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
import { DataSaverOnSharp } from "@mui/icons-material";

export const MuiCRUDhcB = () => {
  //*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datos, setDatos] = React.useState([]);
  // estados para el formulario

  const [estado, setEstado] = React.useState("ACTIVO");
  /* *************************************************** */

  /*id                   integer  NOT NULL  ,
	id_mascota           integer  NOT NULL  ,
	id_veterinario       integer    ,
	nomenclador          char(65)  NOT NULL  ,
	descripcion          text  NOT NULL  ,
	falta                date    ,
	faccion              date  NOT NULL  ,
	halta                time    ,
	adjuntos             text    ,*/

  const [id, setId] = React.useState(0);
  const [foto, setFoto] = React.useState("");
  const [idmascota, setIdMascota] = React.useState(0);
  const [idveterinario, setIdVeterinario] = React.useState(0);
  const [nomenclador, setNomenclador] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [falta, setFalta] = React.useState("0000-00-00");
  const [halta, setHalta] = React.useState("00:00:00");
  const [faccion, setFaccion] = React.useState("0000-00-00");
  const [adjuntos, setAdjuntos] = React.useState("0000-00-00");

  // estado para controlar el boton modificar en el formulario
  const [validacionModificar, setValidacionModificar] = React.useState(false);
  // guardar el id a modificar
  const [idModificar, setIdModificar] = React.useState(0);
  // CONTROL VENTANA MODAL
  const [showModal, setShowModal] = React.useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(false);
  // ***** CONTROL DEL MODULO ADJUNTOS  **** //

  // funcion abre y cierra modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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

  /*id                   integer  NOT NULL  ,
	id_mascota           integer  NOT NULL  ,
	id_veterinario       integer    ,
	nomenclador          char(65)  NOT NULL  ,
	descripcion          text  NOT NULL  ,
	falta                date    ,
	faccion              date  NOT NULL  ,
	halta                time    ,
	adjuntos             text    ,*/

  useEffect(() => {
    cargarDatos();
    localStorage.setItem("adjorigen", "GENERAL,666");
  }, []);

  const cargarDatos = async () => {
    const iddemascota = localStorage.getItem("mascotaorigen");
   
    const elQueryb = {
      myQuery: `select * from pfvet_historia_clinica where id_mascota= ${iddemascota} ;`,
    };
    
    const respuesta = await axios.post(
      "https://buddy-care-rest-api.onrender.com/query",
      elQueryb
    );
    console.log(respuesta);
    setDatos(respuesta.data);
  };

  // ********************   agrega registro ********************

  /*id                   integer  NOT NULL  ,
	id_mascota           integer  NOT NULL  ,
	id_veterinario       integer    ,
	nomenclador          char(65)  NOT NULL  ,
	descripcion          text  NOT NULL  ,
	falta                date    ,
	faccion              date  NOT NULL  ,
	halta                time    ,
	adjuntos             text    ,*/

  const agregarRegistro = async (e) => {
    try{
    if (descripcion.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Complete la informacion requerida",
        text: "",
      });
    } else {
     
       // localStorage.setItem('mascotaorigen',cadena );
      //  localStorage.setItem('mascotadatos',cadenadatos );


       e.preventDefault();
      const date = new Date();
      let xmascota=localStorage.getItem('mascotaorigen')
      //window.alert(xmascota)
      const lamascota=parseInt(xmascota)
      let xveterinario =  localStorage.getItem('profileid');
      const elveterinario=parseInt(xveterinario)
      await axios.post(
        "https://buddy-care-rest-api.onrender.com/historiaclinica",
        {
          id: getRandomInt(1111111, 9999999),
          id_mascota: lamascota,
          id_veterinario: elveterinario,
          nomenclador,
          descripcion,
          falta: date.toLocaleDateString('en-GB').split('/').reverse().join('-'),
          faccion,
          halta:"00:00:00",
          adjuntos: "mi adjunto",
        }
      );
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
          `https://buddy-care-rest-api.onrender.com/historiaclinica/${id}`
        );
        cargarDatos();
      }
    });
  };

  const activarModificacion = async (id) => {
    const respuesta = await axios.get(
      `https://buddy-care-rest-api.onrender.com/historiaclinica/${id}`
    );
    setIdMascota(respuesta.data.id_mascota);
    setIdVeterinario(respuesta.data.id_veterinario);
    setNomenclador(respuesta.data.nomenclador);
    setDescripcion(respuesta.data.descripcion);
    setFalta(respuesta.data.falta);
    setFaccion(respuesta.data.faccion);
    setHalta(respuesta.data.halta);
    setAdjuntos(respuesta.data.adjuntos);

    setValidacionModificar(true);
    setIdModificar(id);
    togglesine();
  };

  // ***************************   modifica registro
  const modificarRegistro = async (e) => {
    e.preventDefault();
    if (descripcion.trim().length < 1 || nomenclador.trim().length < 1) {
      Swal.fire({
        icon: "error",
        title: "Complete la informacion requerida",
        text: "",
      });
    } else {
        const date = new Date();
       
        let xmascota=localStorage.getItem('mascotaorigen')
        //window.alert(xmascota)
        const lamascota=parseInt(xmascota)
        let xveterinario =  localStorage.getItem('profileid');
        const elveterinario=parseInt(xveterinario)
        await axios.put(
        `https://buddy-care-rest-api.onrender.com/historiaclinica/${idModificar}`,
        {
          id_mascota: lamascota,
          id_veterinario: elveterinario,
          nomenclador,
          descripcion,
          falta: date.toLocaleDateString('en-GB').split('/').reverse().join('-'),
          faccion,
          halta: "00:00:00",
          adjuntos: "mi adjunto",
        }
      );

      togglesine();
      cargarDatos();
      setValidacionModificar(false);
    }
  };

  const navigate = useNavigate();

  const routeChangeAdj = async (id) => {
    let cadena = "HC" + "," + id.toString();
    localStorage.setItem("adjorigen", cadena);
    //localStorage.setItem('adjid',id.toString() );

    //window.alert(localStorage.getItem('adjorigen' ))
    //window.alert(localStorage.getItem('adjid' ))
    //let path = '/adjb';
    let path = "/adjuntosprof";
    navigate(path);
  };


 //  NAVEGA A RETORNO
  const routeChangeHC = async () => {
    
    let path = "/crudhistorias";
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
    { name: "nomenclador", label: "NOMENCLADOR" },
    { name: "faccion", label: "FECHA ACCION" },
    { name: "id_veterinario", label: "ID VET." },
    { name: "descripcion", label: "DESCRIPCION" },
  ];

  const darkTheme = createTheme({
    palette: { mode: 'dark',},
     components: { MuiTableCell: { styleOverrides:{ root: {
           padding: '2px',
           size:'small'
          }}
       }},

       typography: {fontSize: 10, },
       
 });

  const options = {
    rowsPerPage: 6,
  };

  /*id                   integer  NOT NULL  ,
	id_mascota           integer  NOT NULL  ,
	id_veterinario       integer    ,
	nomenclador          char(65)  NOT NULL  ,
	descripcion          text  NOT NULL  ,
	falta                date    ,
	faccion              date  NOT NULL  ,
	halta                time    ,
	adjuntos             text    ,*/

  //4 - renderizamos la datatable
  return (
    <>
      <>
        <div>
        <p style={{"color": "white"}}> MASCOTA ORIGEN ID : {localStorage.getItem('mascotaorigen')} NOMBRE : {localStorage.getItem('mascotadatos')}</p>
        </div>
        <div className="d-flex">
          <button className="btn btn-success btn-sm" onClick={toggle}>
            AGREGAR H.C.{" "}
          </button>

          <button className="btn btn-info btn-sm" onClick={routeChangeHC}>
            RETORNAR{" "}
          </button>
        </div>
      </>

      <div>
        
      </div>
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable
          title={"- HISTORIAS CLINICAS -"}
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
                    Nomenclador
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={nomenclador}
                    onChange={(e) => setNomenclador(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    Complete el ID de nomenclador
                  </div>
                </div>

                {/*} <div className="mb-3">
               <label  className="form-label">Estado</label>
               <input type="text" className="form-control " onChange={(e)=>setEstado(e.target.value)} />
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
                    style={{ height: "200px", width: "300px", resize: "both" }}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    Descripción de la INTERVENCION
                  </div>
                </div>


                <div className="mb-3">
                  <label for="validationCustom01" className="form-label">
                    Fecha de INTERVENCION
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={faccion}
                    onChange={(e) => setFaccion(e.target.value)}
                    min="2023-01-01" max="2050-01-01"
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    Fecha en que se realizó la acción sobre esta mascota 
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
};
