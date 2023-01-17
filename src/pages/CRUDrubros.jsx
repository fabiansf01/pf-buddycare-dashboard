import React from 'react';
//import JvCRUDrubros from '../components/JvCRUDrubros';
import { MuiCRUDrubros } from '../components/MuiCRUDrubros.jsx';
const CRUDrubros = () => {
    localStorage.setItem('adjorigen','RUBROS' );
    return (
        <div className='container-sm'>
               <MuiCRUDrubros/>
        </div>
    );
};

export default CRUDrubros;