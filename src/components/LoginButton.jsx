import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <button className="btn btn-primary btn-sm mx-2" onClick={() => loginWithRedirect()}>LOGIN</button>
    </div>
  );
};

export default LoginButton;
