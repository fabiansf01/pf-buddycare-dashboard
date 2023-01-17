
import React , {useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Swal from 'sweetalert2';
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
import RepVetTipouno from './RepVetTipouno';


function RepTiendaMenu() {
    const [fdesde, setFdesde] = React.useState("0000-00-00");
    const [fhasta, setFhasta] = React.useState("0000-00-00");
    const [tiporep, setTiporep] = React.useState("");
    const [repouno, setRepouno] = React.useState(false);
 
    const reporteLaunch = async (e,tiporep)=> {
        e.preventDefault();
       /* Swal.fire({
            icon: 'success',
            title: `Report Launch ${tiporep} ${fdesde} ${fhasta}`,
            text: '',
           
          })*/
          setRepouno(true)
    }
 
 
 
 
 // ********* RENDER  ******
    return (
    <div style={{ width: "900px" }}>

<div className='col-12'>
                  <h5 className='text-center' style={{ color: "white" }}>Reporte de Tienda</h5>    
              
              
              <form style={{ width: "900px" }} >
              
              <div className="d-flex">
              
              <div className="mb-3 w-25 ml-3" style={{ padding: "7px" }}>
                  <label for="validationCustom01" className="form-label" style={{ color: "white" }}>
                    Fecha período DESDE
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={fdesde}
                    onChange={(e)=>setFdesde(e.target.value) }
                    
                  />
                  <div id="emailHelp" class="form-text" style={{ color: "white" }}>
                    Fecha de período si es necesaria
                  </div>
                </div>
             
                <div className="mb-3 w-25 ml-3" style={{ padding: "7px" }}>
                  <label for="validationCustom01" className="form-label" style={{ color: "white" }}>
                    Fecha período HASTA
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="validationCustom01"
                    value={fhasta}
                    onChange={(e)=>setFhasta(e.target.value) }
                    
                  />
                  <div id="emailHelp" class="form-text" style={{ color: "white" }}>
                    Fecha de período si es necesaria
                  </div>
                </div>
             
              

              <div className="mb-3 w-25 ml-3" style={{ padding: "7px" }}>
                        <label  className="form-label" style={{ color: "white" }}>Tipo de Reporte</label>
                        <select className="form-control" onChange={(e)=>setTiporep(e.target.value)}>
                        <option value="VPER" >VENTAS EN PERIODO</option>
                         
                         </select>
                     <div id="emailHelp" class="form-text" style={{ color: "white" }}>Seleccione el reporte a generar</div>
     
              </div>

              </div>

              <div className="mb-3">
              
              
              <button className='btn btn-warning btn-sm' type="submit" onClick={(e)=>reporteLaunch(e,tiporep)}>GENERAR REPORTE</button>
              
              </div>

              </form>
              
              </div>



<div>
  {repouno && <RepVetTipouno fdesde={fdesde} fhasta={fhasta}/>}
</div>




    </div>
  )
}

export default RepTiendaMenu