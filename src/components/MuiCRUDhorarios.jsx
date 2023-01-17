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

export const MuiCRUDhorarios = () => {
  /*  id                   integer  NOT NULL  ,
	id_veterinario       integer    ,
	fechaguardia         date  NOT NULL  ,
	descripcion          text  NOT NULL  ,
	falta                date    ,
	halta                time    ,
    */

  //*********************** ESTADOS GLOBALES  */
  // estado para el array de rubros
  const [datos, setDatos] = React.useState([]);

  // estados para el formulario
  const [idveterinario, setIdVeterinario] = React.useState("");
  const [fechaguardia, setFechaGuardia] = React.useState("0000-00-00");
  const [descripcion, setDescripcion] = React.useState("");

  const [falta, setFalta] = React.useState("0000-00-00");
  const [halta, setHalta] = React.useState("00:00:00");

  /* *************************************************** */

  const [id, setId] = React.useState(0);
  const [foto, setFoto] = React.useState("");
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

  // funcion abre y cierra modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // ASUME ID DE VETERINARIO
  const globalid = localStorage.getItem("profileid");

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
    localStorage.setItem("adjorigen", "GENERAL,666");
  }, []);

  const cargarDatos = async () => {
    const respuesta = await axios.get(
      "https://buddy-care-rest-api.onrender.com/horarios"
    );
    console.log(respuesta);
    setDatos(respuesta.data);
  };

  // ********************   agrega registro ********************

  const agregarRegistro = async (e) => {
    try {
      if (descripcion.length < 1) {
        Swal.fire({
          icon: "error",
          title: "Complete la informacion requerida",
          text: "",
        });
      } else {
        e.preventDefault();

        // window.alert(descripcion)

        const date = new Date();
        date.toLocaleDateString("en-GB").split("/").reverse().join("-");
        await axios.post("https://buddy-care-rest-api.onrender.com/horarios", {
          id: getRandomInt(1111111, 9999999),
          id_veterinario: globalid,
          fechaguardia,
          descripcion,
          falta: date
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-"),
          halta: "00:00:00",
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
        axios.delete(`https://buddy-care-rest-api.onrender.com/horarios/${id}`);
        cargarDatos();
      }
    });
  };

  // **************************************************** Activar la modificacion

  const activarModificacion = async (id) => {
    try {
    const respuesta = await axios.get(
      `https://buddy-care-rest-api.onrender.com/horarios/${id}`
    );
    //setDescripcion(respuesta.data.descripcion)
    
    setIdVeterinario(respuesta.data.id_veterinario);
    setFechaGuardia(respuesta.data.fechaguardia);
    setDescripcion(respuesta.data.descripcion);

    setFalta(respuesta.data.falta);
    setHalta(respuesta.data.halta);

    setValidacionModificar(true);
    setIdModificar(id);
    togglesine();

  } catch(error) {window.alert(error)}



  };


  // ***************************   modifica registro
  const modificarRegistro = async (e) => {
    e.preventDefault();
    if (descripcion.trim().length < 1) {
      Swal.fire({
        icon: "error",
        title: "Complete la informacion requerida",
        text: "",
      });
    } else {
      /*  id                   integer  NOT NULL  ,
	id_veterinario       integer    ,
	fechaguardia         date  NOT NULL  ,
	descripcion          text  NOT NULL  ,
	falta                date    ,
	halta                time    ,
    */

      const date = new Date();
      date.toLocaleDateString("en-GB").split("/").reverse().join("-");
      await axios.put(
        `https://buddy-care-rest-api.onrender.com/horarios/${idModificar}`,
        {
          id_veterinario: globalid,
          fechaguardia,
          descripcion,
          falta: date
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-"),
          halta: "00:00:00",
        }
      );

      togglesine();
      cargarDatos();
      setValidacionModificar(false);
    }
  };

  const navigate = useNavigate();

  const routeChangeAdj = async (id) => {
    let cadena = "HORARIOS" + "," + id.toString();
    localStorage.setItem("adjorigen", cadena);
    //localStorage.setItem('adjid',id.toString() );

    //window.alert(localStorage.getItem('adjorigen' ))
    //window.alert(localStorage.getItem('adjid' ))
    //let path = '/adjb';
    let path = "/adjuntos";
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
            </div>
          );
        },
      },
    },

    { name: "id", label: "ID" },
    { name: "fechaguardia", label: "FECHA DE GUARDIA" },
    { name: "descripcion", label: "DESCRIPCION" },
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
        <p>ALTA DE FECHAS Y HORARIOS DE ATENCION DE URGENCIAS</p>

        <button className="btn btn-success btn-sm" onClick={toggle}>
          AGREGAR FECHA Y HORARIO{" "}
        </button>
      </>
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable
          title={"- Fechas y Horarios -"}
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
                    Fecha de Guardia URGENCIAS
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={fechaguardia}
                    onChange={(e) => setFechaGuardia(e.target.value)}
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    Fecha de atención de URGENCIAS
                  </div>
                </div>

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
                    Descripción de los Horarios
                  </div>
                </div>

                {/*} <div className="mb-3">
               <label  className="form-label">Estado</label>
               <input type="text" className="form-control " onChange={(e)=>setEstado(e.target.value)} />
             </div>*/}

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
