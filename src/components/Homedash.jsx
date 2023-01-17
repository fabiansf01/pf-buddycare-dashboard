import React , {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { homeContainer,newcards } from "./Homedash.module.css";
import { useNavigate, Navigate,BrowserRouter, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
//import { LinearProgress } from '@material-ui/core';

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

//import jwt from "jsonwebtoken"

// ******************************* ACTIVA OPERADORES ******///





function Homedash() {
  
  const { user, isAuthenticated } = useAuth0();
  const [datosOper, setDatosOper] = React.useState([]);
  const [datosProf, setDatosProf] = React.useState([]);
  const [datosVet, setDatosVet] = React.useState([]);
  
  
  
  let navigate = useNavigate(); 
 
/*  const cargarDatosOper = async ()=>{
    //window.alert("cargar datos oper") 
    const elQuery ={"myQuery":`select * from pfvet_operadores where trim(email) = '${user.email}' ;`};
    //const respuesta = await axios.post("https://buddy-care-rest-api.onrender.com/query",elQuery)
    const respuesta = await axios.get("https://buddy-care-rest-api.onrender.com/operadores")
    
    setDatosOper(respuesta.data);
   }*/
   
  


   // *********************************************************************
   // **************** ZONA DE VALIDACION DE OPERADORES / SUPERVISORES 
   const endpoint = "https://buddy-care-rest-api.onrender.com/query"
   const elQueryb ={"myQuery":`select * from pfvet_operadores where trim(email) = '${user.email}' limit 1 ;`};
   const cargarDatosOper = async () => {
     //setLoading(true);
     await axios.post(endpoint, elQueryb).then((response) => {
       // await axios.get(endpoint).then((response) => {
       const data = response.data;
       // window.alert(data[0].nombre)
       // window.alert(elQueryb.myQuery)
       setDatosOper(data);

       if (Object.entries(data).length !== 0) {
         //window.alert(data[0].rol)
         localStorage.setItem("profileid", data[0].id.toString());
         localStorage.setItem("profiledenomina", data[0].nombre);

         if (
           data[0].rol.trim() == "OPERADOR" ||
           data[0].rol.trim() == "SUPERVISOR"
         ) {
           localStorage.setItem("globalrol", data[0].rol.trim());
           localStorage.setItem("globalestado", "HABILITADOOPERADOR");
           routeChange();
         } else {
           Swal.fire({
             icon: "error",
             title: "Su ROL no permite que actue como OPERADOR",
             text: "",
           });
         }
       } else {
         Swal.fire({
           icon: "error",
           title: "Su  E-mail no esta registrado en la Base de Operadores",
           text: "",
         });
       }

       //setLoading(false);
     });
   };

  
  const routeChange = () =>{ 
    let path = '\oper'; 
     navigate(path);
  
  }

  const validaOperador = ()=>{
       cargarDatosOper();

  }

// ********************** FIN ZONA VALIDA OPERADORES  ***************************


//***************************************************************************** */
 // *********************************************************************
   // **************** ZONA DE VALIDACION DE VETERINARIOS PROFESIONALES
   const endpointprof = "https://buddy-care-rest-api.onrender.com/query"
   const elQueryprof ={"myQuery":`select * from pfvet_veterinarios where trim(email) = '${user.email}' limit 1 ;`};
   const cargarDatosProf = async () => {
    
    //setLoading(true);
    await axios.post(endpointprof,elQueryprof).then((response) => {
     // await axios.get(endpoint).then((response) => {
           const dataprof = response.data
      // window.alert(data[0].nombre)
      // window.alert(elQueryb.myQuery)  
           setDatosProf(dataprof);
           //window.alert("valida profesional") 
           if(Object.entries(dataprof).length !== 0){
           
            
            localStorage.setItem('profileid',dataprof[0].id.toString() );        
            localStorage.setItem('profiledenomina',dataprof[0].nombre );
            //localStorage.setItem('globalrol',dataprof[0].rol.trim() );
            localStorage.setItem('globalestado','HABILITADOPROFESIONAL' );
            //window.alert(dataprof[0].id)
            
            routeChangeProf();

           
           }else{


            Swal.fire({
              icon: 'error',
              title: 'Su  E-mail no esta registrado en la Base de VETERINARIOS',
            text: '',
     
           })
           
          
          
          
          }


           //setLoading(false);
   })};

  
  const routeChangeProf = () =>{ 
    let path = '\prof'; 
     navigate(path);
  
  }

  const validaProfesional = ()=>{
     
    cargarDatosProf();
  }

// ********************** FIN ZONA VALIDA PROFESIONALES  ***************************




//***************************************************************************** */
 // *********************************************************************
   // **************** ZONA DE VALIDACION DE VETERINARIAS
   const endpointvet = "https://buddy-care-rest-api.onrender.com/query"
   const elQueryvet ={"myQuery":`select * from pfvet_veterinarias where trim(email) = '${user.email}' limit 1 ;`};
   const cargarDatosVet = async () => {
    
    //setLoading(true);
    await axios.post(endpointvet,elQueryvet).then((response) => {
     // await axios.get(endpoint).then((response) => {
           const datavet = response.data
      // window.alert(data[0].nombre)
      // window.alert(elQueryb.myQuery)  
           setDatosVet(datavet);
          // window.alert("valida veterinaria") 
           if(Object.entries(datavet).length !== 0){
           //window.alert(data[0].rol)
            
           localStorage.setItem('profileid',datavet[0].id.toString() );        
           localStorage.setItem('profiledenomina',datavet[0].razon );
      
                    
            
            localStorage.setItem('globalestado','HABILITADOVETERINARIA' );
            routeChangeVet();

           
           }else{
            Swal.fire({
              icon: 'error',
              title: 'Su  E-mail no esta registrado en la Base de VETERINARIAS',
            text: '',
     
           })
           }

           //setLoading(false);
   })};

  
  const routeChangeVet = () =>{ 
    //window.alert("CAMBIO A VET ")
    let pathvet = '\petshop'; 
     navigate(pathvet);
  
  }

  const validaVeterinaria = ()=>{
     
    cargarDatosVet();
  }

// ********************** FIN ZONA VALIDA PROFESIONALES  ***************************













//  ****************************************************************

  return (
   


<div >
    <div>
    <h1 className="text-center" style={{color: "white",}}>Buddy Care DASHBOARD - V-20230112- 1-0</h1>
    </div  >
    
    
    {/*<div className="container  " >*/}
    <div className = {newcards}>
    <div className="row justify-content-center">

        <div className="card me-3 " style={{ width: '14rem', height:'25rem' }}>
  
         <div className="card-body" >
           <img class="card-img-top" src="https://blog.hubspot.es/hubfs/atencionalclientequeescomomejorar.jpeg"/>
           <h5 className="card-title">Operadores</h5>
           <p className="card-text">Acceso de OPERADORES  Y SUPERVISORES  del  sistema, donde podrá realizar A-B-M y reportes de control                      </p>
           <br></br>
           <button className="btn btn-secondary" onClick={validaOperador}>INGRESAR</button>
          </div>
        </div>
    
        <div className="card me-3" style={{ width: '14rem', height:'25rem' }}>
  
        <div className="card-body">
            <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJbbVVqa_NR07-3Ib36y5x0A6fN6qPwWUupg&usqp=CAU"/>
    <h5 className="card-title">Veterinarias</h5>
    <p className="card-text">Acceso de PET SHOPs afiliados, donde  podrá realizar A-B-M de su stock de productos y servicios, y además reportes de control.</p>
    <button className="btn btn-secondary" onClick={validaVeterinaria} >INGRESAR</button>
  </div>
</div>
<div className="card me-3" style={{ width: '15rem', height:'25rem' }}>
  
  <div className="card-body">
    <img class="card-img-top" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRUYGBgaGhoaGBgcGhgYGRoZGBoZGhkYGRgcIS4lHB4rHxgYJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHxISHjQhJCQ0NDQ0NDQ0NDQxMTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALQBFwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EAD4QAAIBAgQEBQEGBAUDBQEAAAECAAMRBBIhMQVBUWEGInGBkTITobHB0fAUQlJiI3KC4fEVQ5IkM5PC0gf/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAkEQACAgICAQUAAwAAAAAAAAAAAQIRAyESMUEEEyIyUXGBsf/aAAwDAQACEQMRAD8A7q0UUUQhxFeKKKwoeNeKKFhQrxXiihYUK8UUQj2BXcjvK1pZtWJ9IQYlWU46FZR/DL3+Yfw5squo2Ovva35CDS3Dbn0ksaBVorbYR8g6CTWSCwWwK6gJFr2kEWwlrKYsmkviTZAxpIxpBRG0iRJyJgBEymuwA1bLe+u3rbvaXEwd8MrurNsg16Xbl8AfPeKbpGuGKcrfgow9LKpJFr3PfzSOWFV2vtJ0VAnO/kzuj8VZgcXwhdCAAe3a081xmDKnXQ69dp7LVpg6zkuOcH+1YspAJ9f1ji+JM48laPMa6HpeD1qel52VXwk4tmIPppMXiuFCaa6etuwGs1Uk+jmlja2zJ4fijRqJVU2KsDp0G49xcT3dDcAzwelh2d1RQSzMABruTae700sAOgA+JrE5pjmMY8iYyBoo0UKA6CKV54jWEyNSy0eVitF9rACyPaVfaR88dgTMUg7yKOTCwLDHWRk6Rjj2JlmSMyy5SLayLTUkGMlT3kWMSHUTJ9jQyy2lRLbe8bDUizW5X1PQTXsFFhoOQlRQMDOE/uEpqYU8rH3huWUsmk0oKAGpm9ra9LiR+zN7W16aQssbWXQcz1hBGVNOkXBBZlPTI3BHtKzNlBoOsc4ZTqwFvQfN4uIjDaD4xyFsOWp7tz/T2jUfEFCu70sKMyUyoesPoZifoQn6xpcte21rg3kqq3BnNl/Ds9PDyzmxj8lVHBJpucrf2OdLN01nSM/ScxxTgJZ86MUufPY79brsfea6Eoqqx0tuenKZWdXEuq1SRblM+rUEKr1ARpM3Ev1iey40V4rE30nH+IlDEAbn97TexVa2p2HKc4+GbEVURCAXvdriyrzPwBpzJtNIR2YZ5JRoO8CcIzVTXI8iXVO7ncjsAT8z0MCD4LDJTRUQWVRYDt+ZhIE6kqPNlK2NaMRJGRMCSEUkRFGBoCQrSYkXEzkWh6YloEqWTvJGiaiTAlWaVNWsYDCWjKdZUKl44eAWFAxAyoPFmlIVhym4kqFQAm4vAabm4A1h6YduYsJoSUNRJJyjTryHqZZh8GSbki3O35TSpoALWjF+kUqW2NJjogUWAsImYSkvI5jM/c/DTiWs46ynEHZRzP3QauxBuBpzH5yCuRqpv0jWXewcNBJW2gk8RoFBkMM4Y769JU5z1LchvN00+jJqg3Di9267egnnHjXjlXG4j/pmCaw1/iao+kKv1qSP5V2a31Hy7Ahur8c8d/g8I7qbOwyU7bhiDdhf+kAkd8vWc54S4T/B4Jqrj/HrI1V7/UEUXRNddMyk9z2glbGNhMHSwVBkoagE3dtSz2AZm76be0WDr5zZmfNfS5te17iw9JjcAxRqpSDa+VXO9izAFie9yYRicyVXsLksKiDa5XRlB9FU2/zTz5u5Nnp4lUDoVbKt22Gs5Tj7PiLqpsBsOp7w3iHiFCoU3Vm+oEGw/tvAuF4oGoRuCL9pK1sttPRkU8iKA71Eb+VwflXXYkHtCsNiHJszK68mBJm9XpprmUG/pMrEhV0RCW5KoJJ+OQ6y7vwZyXHdmbxivkQ9Tp6d5f4d4OXZKg+gaszDViNkUche9z6Q7hfCDUOaopy6E30uRsFvy1/HnOqSmFAAFgNABymsIt9nPlyqOl3/AIOolgWRWWCbnEiBWRtLZFhACEUVo8ADI5EVpOnMy0DG8RVpofZiNlEVjozxTeD1gwM2YFi0ibBIFoXl6HWSoLpNvheDAAci7HbsO3eNKwB6PD3b6vKO+/x+toWvD0XU3brra3ewhjnteVs9tdSPnT85qooBkwqLqq69bk/jLWEZDy5cv30g+LrW0ik1FWEY8nRZVqd9JBDeZVfiAHPTaaOHqAqPSc3uKTN/bcUWsIwMd9YM721MG6BKx6pglNrNblMPiniIpVVFW4vrqL/Eup43O11/dpDyRK9to16z5GDjbYwrh6ZRmYi5uxPK3L7pzfE+I5EJc2Ug2PLbacxw/H43EYVEw1XKz1HXPcXCqxCrcqTbL5ri3sJvhm268EZIJKwrxDiRxDilDCrrTpEs+xHk81S/UFwiW6oes7LxKo+zfn5GXvYjUfIHxBPC3hmng/OxD4h1CvU81got5EBJst1BJOrHU9BzP/8ASxevhXILBHTyXIBu4O219LX9J2Y1bo5m6VnP+EqjfZraxKDKR/lJX8pp1cUGJRxpqQdb+x5Hnac9jD/C4k5NKVa7KD/KxPmX5IPoR0ixHEWBvlPxf7xODJjlGbPQxZVwTQXjEcnyuD/mUH7wRrLOFo6HMzAi+p2AAB0tfe9pj1+Iu2iqdedvu1jpiHy+dsq9L3Jv0HUyeLZXO3aRq8W4ytMFmuf6QNye3bvOo4LggMMlXd6iJUcnXRlvlXoBecB4nwjKtFLedrEjuxY5e5AUD4nrdPDqiIg0CKEHQhQBb7p0wxqPZxZcjl/AKm0lE9PKbcuXpFKMB1lolKy0QGKIxRmMAIGKK8UADpJDrIB44MxNAjNGNQSkpfnEKHeGyi37QSquwIjrQ9ZYuHHSLYFWDp3YA7EgTpUGkx8JRGYfPxNiaw6IYmbpBaj632P3f7iEFx3PpBcW4K9Ok067Dsow2NCnIxtqSPQ7e17/ADI46pmLehA9pn1UDOOi6+3T5t8S8Pcr3v8AE5s81XFG+KDW2cVxviJQgDrOywOI0XuoPuRrOO8T0QtWmp+l6lmPrOh4U4Zyf5VAUe2n5ThinE7JNSR0C4i+wvOf8WV8R9n/AIC89T/NbnlHXvOgonSV4gTqa+JzJpM8B4rTqNiLoahFxbOpDoL3s3Inlcbz0Hww7lBnuTfS/bedLU4cGb6R8RU8IEOg9pjlk2kqNYJJt2LE4dXRkdQykbH8Jl+GMEMM+RAQodmsTfRwbj8PibWJpNuJnrigr3HLcc/aPFPjJX0KcbizoTUubzlvHNNTS+0O6PTYH0qJf7rzXo41SQpI830f3aXIHewJ9j0mX4tXNhagO3lv7Os9XG/kmjz5rTOA8ZWakpGrI6hbakhgQQPWy/E58YltnDKRa4IKnboe06bD1nBIW2nPTp3U/jMXiPEqbt/6iiWZfLnRspIB2I58/maZ8Km+SYsOZxXFg1LFM5yU0Z26Afeeg9Z1Hh7gbCojVyGqG7JTGoRR9Tn0B36m0I8Iim9O9OiVOawW9y2gsxa3fUn751n8MqOi6F3sXb+xCSFHa9viZxxRgre2XPNKfxWkcdxNRW4rRpi+Wmc56AoASD/8eX3E7zEv5AOZM4zw3hz/ABeNruNRVemvs5v8BV/8jOqwbF3BOw2iS8kM0mp5lAPT74CRbQzVVbwLF0v5vn9ZMkAODLVMpEkDJAtJlbNIlorwAlFIRQA2VoCTFKaYwwkhQExN6M1acn9nNJaIleIo6RBQCEEaW0Bc2ixFOx0kjJYdPMDM3xR4jXDKqqv2laoStKkp8zsNyx/lReZhdbFCkhdtbaKOrHb2nniYxE4pSaqdalBkQnUZ2qE27FvOPU950Ri1jciNOSTN/DYWpVUNi3zsRcoLiih3yomxA/qa7HryhodKamwCqBewAAhNrTG8RUWNNihINtQOY5zinOXdnoQhHqizgXEhWFZhuGKj2UEX+ZqUgbr2CiZvh7DIiXRQquA+XoWXW/75TTdgLTG/LHLukcn4/Pmo2/rJPttNPgOLXLl5219ZjePKwJpKN/M3tpMDA8UZHU65RobffNI0zN2tHrGHrg7fEJDDoTOX4HxhHvYm4173h+L8Q06bpSb6mF7nQD36zWO0ZSVM2WfotpBKPOSoVQwuDLH03g4gpMpxJCqSZ5n4mxlmJQkGeh4/FArbseU8l8S4pkqE/wAmp2BvfQwjBSkEpcYmnwPxWn0V2ykHMr/0sNj6dROo49VV8HVZSCClwRqNxsek8Zq8SAY5U8vK+/vPQcPnp8PKMSS6gga6Z2BCge9p14VxdI58j5IyOHuAT0AhPBPCzYmoarrlpk3UHQv0Nv6e/P75s+GfDDD/ABK43+mmfxf/APPz0nbJTAGk6ZZPCMIx8geCwKUVsigTlvE3Hf4f7SouV2BFNAfpzEi97dADp2naMZ5R4oYVMcKA+hGLv0Jbz6/6SB/qmTbZaRucHDCkoY3dy1RzsS9Q5muB6ge07Th2HyoL7zG4Bgb+dx3Am/UfkJT/ABCLc2sZqeYEdrRkU2tLlW0ljMSKX4tLNcbHX9ZRMxETFEYhAB1iiWKAHZo8uWBYeGJMToLFErxT2ETVLTG8Qu+QlCRax06Soq2kRKVJsvTRriX5SZn4ap5QTNJHuJEo02hp2rOd46SxtyX8Tufy9pgvwdaz0WYa0qi1AQL3UalT2vY/M67F4DMxN9Dy78zLaNFKY0FyZ1e5FY6vwQotzsyq1YKRmPlOl+naB8VqFUIAuX0Uc9dLTS4gikEEeUgmw68hHo4QKQx1KrYX1sbWv+M8qb8I9OLS2zO4bSZEUMLGw/4l9Wpe8IxzhcvSwv76QTGUyR5Ta/MfhMZLwi0/LOD8UYrNiQvJFC35XJudfiZB8jHN9J37dDNvxHwt1dWNwpPmtvr3lZ4d9KN6Kx59ies3jpIzatmjgcMQFdLZgNxs4PI9R/tKePYH+JQMrZXQ+U6gjqj9jpYjtD+C4R6Xk3Q7D+k9u3aH1sEobONOTdx3EpOnaG4qSpnD+G/F74eyuzMA1irasFIvodtLbHqJ6dgPElCul0qKe1xecT4h8P0H8wAR98yj6uuYc5w+O4RUoEGwym+VwSAex6HtedEXGXWjmlFx7PZeI1hY2PwZxPE6edjoCOZNpjeG+KgB6dVmDG2VmY2B1GTU84TWw4z639zKS4sqOLlG7DuCeGKBYVCA4OqqSSoN9z3nd4bCga2ufw9BOV4FUCIwJ0uCOfsJ1eCxSuAV09d5rF2c+WLi6DVawvLA4C3MjaUYo/yjnLMQXG48JSqVXFkRS56nLrYdybD3nA+EMI+JqPjMRrmItpYHLZVUD+kWA72G+s2/HTtU+wwNM+aswZzvlpIb3Pqwv/o7zUw2HRFShSFkQAH22BPM8z3MaVv+AfRt0hlXTcyVNLb7yNMaDsJYXCi5NpQi5TaPm6ygVS30iw6nSSUe/wCHsImFg2Ob6RzsSYJL8W13PYAfn+comTEIxoooDHEaOsaAjpcNjUOlxNFKgInK8J4f9o9s1ramb2Jw32drGcybOlltRrtCalMFbWmaj66zRSqvWUmKjPqYU8hL6KEDaHqoiqWUEmJryMzapt+kDZ9dZbiK+pPP8IKpJOo9P37zCct0bxhSsmUBMuYfhKBcEQm1x7WkrZbMvEUs+4/YlSoyjqPymoE1/fvIlLacpkobs0c9GJxvDCrTIIvpb3tpOe4DXBH2VQDMNFJ5jof7p1tenuOU4jH4VkZxzJupHMg3Xbnp981TtbJuno6ujTy2B9jA+J4rKCq2JPf74MuOqsuXZ1AzjnqN7QUIFN7knneNM0IfaNazWJN4LV5hgCDuDqD6iFVN7/v0g9SmSe0dk8bBTw3CvcfZBbbqosNRvflKK2FSwRAwtzZmc+mvKFqmV83sfylmJwtjmuLEf8zXHO1TMJJwdxB8EhOg5TouEErMTDNlVm5i3xLaXEGY6aTpgqMMknLvs7qk9xKntmuSAO8yOF4plBLG6hSTcgWsL3vymDxnjv29UYSgRUL/APvsp8iJzpKw5nZmGwuBrtqYUPw4vWrVMSPrreWgT/28MhsHtyLEXA5nXkZ0+CwyovQDcnn1JPWRwOHyCwAJ5nYaaADsALADTSHfwoexa+m2pA+BKWlQDBydvmJKOtzqep1+Okn/AA1tmI7aH8RECRu9vUWgIsCHrGepYE72++RL303PobQfE1P5R79u0mTED3vrGiEUzBCjEx4xEBjiNHAjRAZ3CeMuj5l326gg8vwnVpialSzMLflHoeGaSEEKNJrLh1AtpOZRZ0WZNZ7CR4dRdmDZj6TVbCod5ZRVU2g42NSom9fJYGD4vE5rKPWX1HU78plO92Lfu0JOkXFWx1W5kEQl7nl+svtrJZbGZcbZrypDvSvK9oYgjPSBE0cL2jNSoDDc5XUflCWpWg9enIlFpFKQDiHtqdtLwB6eoe1zzH5iataiCpU89Zn/AGZGg2kNNMvkmjMxWFLOGT6wCb9zaw+6DY/yEFl8htdtwt+TdPXabqgLvYe0HqUc5Y28pXIR1A20/e8aQKVGdWwosNRbcW2/GDVKetum8xfD/GAhfDVybozBG/tBsVPoTv0heJxTZstK9zpsDcnaNwldGkZpqwnDJmqhLXAuzdAALD5JAt69DCMUhVSLXXl37eo5GE8Mwn2aG7BnbV3H8zagAf2gaD3PMy5gGFiLz0sfpUsdPvs83N6m8lrro5hjowGxEq4G1wWPUge2k2uJ8DdBnS7oQDb+ZQRfUcx3HxMXhSZUHcsfliZnTTpl2ntGpxuo/wDDOEuC7KlxsFNy2YnZSqkf6oF4b4KEqqwaxuc65QLi+VDe9ypYMe9mPIw5aCOGfEMwRCMiqTv/AFBR9btsFsT7mdLwrhK2DFSt/NYm7AkDRraXAAXTQAWHU6x/TOTNLD01AsLf7S0raWJRA0EcoOkdkg7gGUlGGxhTUxB67229+0QmC4lyFOZt9AB1gqwaq5L3JhKzNuyRRRRQGKKKKAIcGKIRQA6GtjMuhMSViecEqYTMbmXUVtpJ4ork7CRfmY1x/VK2vIFO8OJXIsdhY2MEL+XtLGNjbnB22t2H5TjzSTlrwdmGLUd+Q9NQPaWMdRM6lXIFoYj3F4RkmE4tBitJiUrJO2k3Rgx3YQNmsbH93vJGpB6z3EhyRSTKKtexsR7yOcH9f1kai5heQdLazNs1SJvRud4yMBcWloXy3H/ECd9T++klyplJWjy3iOAqVazPh1Dsrm6ZlVlB0N8xF1Nr3HPTlOm4VgDSs7sC7iwteyAXDWPMna/+be4MxcfRanWLJodd9jedBh+IpUGZVBOUKUJuycteug37e09P0/CbtraOHO5xVLpmjQfTfrCsNQLmw0vpfpf9/dMtMUBZN20FvzPaa3hmoztUdiSiNlpi2zEDO2nt/wCZnbL4ps5IK2b1RBsOQ+NplYzhFJwWKDNuSt1JB56bn1mwn4iQwo8zAzjOno5ReAujFxVZ00KLbKaY2YG2j3PMj4nS4BmC6i46j8xy9rybJlBtrY3HcHcSVNbWy7HVD+KHvAYQ7bSBeWJZlJGnUcrjf0P71g6P8QEQqubQDENYW5mE13uYFiN7fvWKXQmZ9T6oUm0Fr/VCUOkzRI8UQkpQyMUUUQhCKNFAZ0V5BTGDRgdYhloiJjZpRxfDvTysWGU8huTbb0GkmclGLb8Fwi5NJA61buff7tJNhY+v6wOluCP3y/CHLqbHp+ev5TzVKz0uPEqtYel7QvDnQD96Spqelpdg1ubdNJpBPkRNqgtI9VrCSy2guKOh1nU3SOVK2UVKo6wGtiNLj2/WYnGMW+bKpI1leFp1LfVp3/3nNJuR0RSRuYasdR3/AOfzhFQ6X+fSYwr5dzqYR/1K4yka/jCLfTGw/DVgQVEDxAsCOeh+/wD4kcISt9P309pdiHUnUgG2h5EdDFTfYWkc3xfCq7EjcHX0ubH8Zi18OUJdDlYDQje3Ne97fdNTitVgRbfY/v8Ae4lSU8yKTzv9xI/KdXp03JGOVriUYaupTMu7bm+oPPUzseDUMmGQbEhmPfMzEH1ylficpw7hzGsgTRSbubXCgDU2PsPUidwp0sLAAWAHIDYT0sk7ikcMY02X4dybSxnysT2MAwtSzH5l2Ka5EyZYTSS6jrqZPC2KsDsDf0lVJ7GM7Zc45H9ZIxGtZy3IjzdCOvbmfmLDtdQehKP7Gwb99YLiXsE/uBB92X8rypMRlzgHTNv3sM333gKwqvUCXvuNJmu5JJ6yD1STcmRDSG7AqxG8vpnSD4gy2mdJKJLoowMe8YCjXijQAeKNFAZuiR5xRQAsMD4ti2d0vb6Rpy1MaKcvqvp/Z1ek+4PhuUOXdfePFOPGdswipJYHc+piinTD7HPP6hTmZmIiilyIj0YmNoKTqJnUK7A2B0jRTE1NBkBAJ3tC8Lh1IuRrFFKh2TIJyC/sJy/Hq7Aix7e0UUuQomIlQldYVwjEEk0yAV1PO4Om2sUUrD9kLJ9To8OQt1CgDfnv8w+kdY0U7vByMGdyGa3UwwnQR4owJpyixbm59I8UAKcX/wBr2/8AtM53OVe9yfWKKJksT7L33+ZARRTN9iI15ZS2iiiXYFojmKKDAaKKKACiiigB/9k="/>
    <h5 className="card-title">Profesionales</h5>
    <p className="card-text">Acceso de PROFESIONAL VETERINARIOS afiliados donde podrá gerenciar historias clínicas y el SISTEMA DE ATENCION DE URGENCIAS   .</p>
    <br></br>
    <button className="btn btn-secondary" onClick={validaProfesional}>INGRESAR</button>
  </div>
</div>
</div>    

</div>





</div>


  )
}

export default Homedash