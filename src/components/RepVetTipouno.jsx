//import React from 'react'


import React , {useEffect} from 'react'
   
    import axios from 'axios'
    //import Modal from 'react-bootstrap/Modal';
    //import Button from 'react-bootstrap/Button';
    import Swal from 'sweetalert2';
    
  
    





function RepVetTipouno(props) {

    const [fdesde, setFdesde] = React.useState(props.fdesde);
  const [fhasta, setFhasta] = React.useState(props.fhasta);
 
 
    
    
   
     
     
     //*********************** ESTADOS GLOBALES  */
      // estado para el array de rubros
     const [datos, setDatos] = React.useState([]);
    // estados para el formulario
    const [descripcion, setDescripcion] = React.useState("");
    const [estado, setEstado] = React.useState("ACTIVO");
    const [id, setId] = React.useState(0);
    const [foto, setFoto] = React.useState("");
    // estado para controlar el boton modificar en el formulario
    const [validacionModificar, setValidacionModificar] = React.useState(false);
    // guardar el id a modificar
    const [idModificar, setIdModificar] = React.useState(0);
    // CONTROL VENTANA MODAL 
    const [showModal, setShowModal] = React.useState(false);
    // Modal open state
    const [modal, setModal] = React.useState(true);
    const [apagar, setApagar] = React.useState(0);
    const [paypalon, setPaypalon] = React.useState(false);
    const [paypalprice, setPaypalprice] = React.useState(0);
    const [eltotal, setTotal] = React.useState(0);
    

    
    
    // funcion abre y cierra modal 
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    
    
    
    
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    
    
    // Toggle for Modal
    const toggle = () => setModal(!modal);
    
      
     useEffect(()=>{
    //window.alert("use effect")
      cargarDatos();
     },[])
     
    
    
     // https://buddy-care-rest-api.onrender.com/query
     const cargarDatos = async ()=>{
        //window.alert(fdesde)
        const  id_vet =localStorage.getItem('profileid')
        //window.alert(id_vet)
        const fechaDesde = fdesde.toString();
        const fechaHasta = fhasta.toString();
        const elQuery= {"myQuery":`select *  from pfvet_commerces where fecha>='${fechaDesde}' and fecha<='${fechaHasta}' ;`}
      // window.alert(elQuery.myQuery)
        try{
            
            const respuesta = await axios.post("https://buddy-care-rest-api.onrender.com/query",elQuery)
      console.log(respuesta)
      setDatos(respuesta.data);

      // Totalizar la propiedad precio de cada elemento del objeto de respuesta
    const total = respuesta.data.reduce(
    (acumulador, elemento) => acumulador + Number(elemento.importe),
    0
  );

        setTotal(total)
     
    
     
    
    
    
    } catch (error) { 
        // Este código se ejecutará si se lanza una excepción durante la ejecución del bloque try
        window.alert(error);
      }
    
    }
     
    
    
    
    
    
     
    
      
    
    
    
     /* swal({
        title: "An input!",
        text: "Write something interesting:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
      },
      function(inputValue){
        if (inputValue === null) return false;
        
        if (inputValue === "") {
          swal.showInputError("You need to write something!");
          return false
        }
        
        swal("Nice!", "You wrote: " + inputValue, "success");
      });*/
    
    


      /*{
		"id": 93818,
		"id_cliente": 1934771,
		"id_articulo": 6794474,
		"tipo": "COMPRA                   ",
		"detalle": "ALFOMBRITA BUHO",
		"fecha": "2023-01-11",
		"comprobante": 43205,
		"importe": "1112.19",
		"mediopago": "PAYPAL                                                           ",
		"cuota": 1,
		"decuota": 1,
		"falta": "2023-01-11",
		"halta": "00:00:00"
	},*/


// <div style={{display: 'block', width: 900, padding: 30, position: "fixed"}}>

    // ********************************************
      return (
    
        <div>
               
        <div style={{display: 'block', width: 800, padding: 30, overflow: 'scroll'}}>
           <div className='container-sm'>
                <h5 className='text-center'style={{ color: "white" }} >Ventas en Período</h5>
                
                <div className='row'>
                  <div className='col-12'>
                    <h3 className='text-center'></h3>
                    <table className="table table-dark table-sm" style={{width: '800px'}}>
                      <thead>
                        <tr>
                          <th scope="col">Ref.</th>
                          <th scope="col">Fecha</th>
                          <th scope="col">Cliente</th>
                          <th scope="col">Articulo</th>
                          <th scope="col">Detalle</th>
                          <th scope="col">Importe</th>
                          <th scope="col">Comp.:</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          datos.map(fila => (
                            <tr>
                              <td>{fila.id}</td>
                              <td>{fila.fecha}</td>
                              <td> {fila.id_cliente}</td>
                              <td> {fila.id_articulo}</td>
                              <td> {fila.detalle}</td>
                              <td>$ {fila.importe}</td>
                              <td> {fila.comprobante}</td>
                             
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    <table className="table table-dark table-sm">
                  <thead>
                    <tr>
                      <th scope="col">TOTAL OPERACIONES: $ {eltotal}</th>
                      </tr>
                  </thead>
              </table>
                    
    
                 
    
    
                  </div>
                </div>
              </div>
          
        </div>
        {/*-------- FIN DE LA PARTE MODAL  ------- */}  
      </div>
    
    
    
    
    
 
 
 
 
 
 
 
 
 
 
    
  )
}

export default RepVetTipouno