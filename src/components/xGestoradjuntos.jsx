import React,{useState } from 'react';
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



//  ********************************************************** */
  function Gestoradjuntos() {
 

   
       

 
 
 
    return (
      <div className="container mr-60">
     
      <form method="post" action="http://www.fpsoft.com.ar/pfsubefotos/subearchivos.php" enctype="multipart/form-data">

<input type="file" name="archivo[]" id="archivo[]" multiple=""/>

<button type="submit">CARGAR </button>



</form>

    </div>
    );
}

export default Gestoradjuntos