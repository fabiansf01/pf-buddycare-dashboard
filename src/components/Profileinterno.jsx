import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fontBlanco } from "./Loggroup.module.css"



const Profileinterno = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  // return <pre>{JSON.stringify(user, null, 2)}</pre>;
  return (
    
      <div>
                
        <p className={fontBlanco}> ID: { localStorage.getItem('profileid')}  Denom.: {localStorage.getItem('profiledenomina')} </p>
       
      </div>
    )
  
};

export default Profileinterno;