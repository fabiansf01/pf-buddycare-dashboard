import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fontBlanco } from "./Loggroup.module.css"



const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  // return <pre>{JSON.stringify(user, null, 2)}</pre>;
  return (
    isAuthenticated && (
      <div>
                
        <p className={fontBlanco}>Logueado: {user.name} Email:  {user.email}</p>
        
      </div>
    )
  );
};

export default Profile;