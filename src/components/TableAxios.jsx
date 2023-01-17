import { useState, useEffect } from "react";
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

export const TableAxios = () => {
//1 - configuramos Los hooks
const [products, setProducts] = useState( [] )

//2 - fcion para mostrar los datos con axios
//const endpoint = 'https://fakestoreapi.com/products'



const endpoint = "http://localhost:3001/query/"
const elQuery =[{"myQuery":"select * from pfvet_articulos;"}];
const getData = async () => {
    await axios.post(endpoint,{"myQuery":"select * from pfvet_articulos where nombre like '%K%' ;"}).then((response) => {
        const data = response.data
    //    console.log(data)
   // const {data} = await axios.get(endpoint)

       
        setProducts(data)
    
})};

useEffect( ()=>{
    getData()
}, [])

//3 - Definimos las columns
const columns = [


    {
        name: "Delete",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={() => {
                const { data } = this.state;
                data.shift();
                this.setState({ data });
              }}>
                Delete
              </button>
            );
          }
        }
      },

      {
        name: "Edit",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(tableMeta)
            return (
              <button onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}>
                Edit
              </button>
            );
          }
        }
      },

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
    },
   
   

   /* {
        name: "Add",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={() => {
                const { data } = this.state;
                //window.alert("click add");
                data.unshift([222, "ARTICULO DE PRUEBA", "100", "100"]);
                this.setState({ data });
              }}>
                Add
              </button>
            );
          }
        }
      },
      */






]


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

          <button>AGREGAR </button>
          
          </>
          <ThemeProvider theme={theme}>
            <MUIDataTable 
            title={"MOSTRAR INFO CON AXIOS"}
            data={products}
            columns={columns}
            />
           </ThemeProvider>
           <> <p>kjhdjkhadjsfkhsdjkfhjksdhfjkshfdjkhsdfjk</p></>
           
            </>
        )

}