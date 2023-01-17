import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

//  <React.StrictMode>
//  </React.StrictMode>,



/*<React.StrictMode>
  <Auth0Provider 
  domain="dev-4dagzhs326hhdc03.us.auth0.com"
  clientId="1ZcdlURYZfyDj4G3AVHHDzeALTWSQdtg"
  redirectUri={window.location.origin}
  >
    <App />
    </Auth0Provider>
    </React.StrictMode> */

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
  <Auth0Provider 
  domain="dev-4dagzhs326hhdc03.us.auth0.com"
  clientId="1ZcdlURYZfyDj4G3AVHHDzeALTWSQdtg"
  redirectUri={window.location.origin}
  >
    <App />
    </Auth0Provider>
    </React.StrictMode>
  
 





)
