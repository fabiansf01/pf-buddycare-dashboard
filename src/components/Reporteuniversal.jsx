//import { useState, useEffect } from "react";
import React , {useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
//import Swal from 'sweetalert2';
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

function Reporteuniversal () {
//1 - configuramos Los hooks
const [products, setProducts] = React.useState( [] )

//2 - fcion para mostrar los datos con axios
//const endpoint = 'https://fakestoreapi.com/products'



const endpoint = "http://localhost:3001/query/"
const elQuery ={"myQuery":"select * from pfvet_articulos where nombre like '%K%' ;"};
const getData = async () => {
    await axios.post(endpoint,elQuery).then((response) => {
        const data = response.data
    //    console.log(data)
   // const {data} = await axios.get(endpoint)

       
        setProducts(data)
    
})};

useEffect( ()=>{
    getData()
}, [])

//3 - Definimos las columns



const neocolumns = {...products};


const columns = [
    
    {
        name: "id",
        label: "ID"
    },
    {
        name: "nombre",
        label: "NOMBRE"
    },
    {
        name: "precio",
        label: "PRECIO"
    },
    {
        name: "stock",
        label: "STOCK"
    },]
   
   

   


/*const columns = [
    {
        name: "id",
        label: "ID"
    },
    {
        name: "title",
        label: "TITLE"
    },
    {
        name: "price",
        label: "PRICE"
    }
]*/

const theme = createTheme({
    palette: { type: 'dark' },
    typography: { useNextVariants: true },
  });
  

//4 - renderizamos la datatable
        return (
         
         
         <>
          <> 
          <p>PRUEBA MUI DATA TABLE CON BOTONES </p>
          
          </>
          <ThemeProvider theme={theme}>
            <MUIDataTable 
            title={"AXIOS"}
            data={products}
            columns={neocolumns}
            />
           </ThemeProvider>
           <> <p>PRUEBA DE REPORTE UNIVERSAL </p></>
           
            </>
        )

}


export default Reporteuniversal