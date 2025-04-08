import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import {Auth0Provider} from '@auth0/auth0-react'

//FrontEnd App > User to register and login via Auth0 > Auth0 gives user details to BE > BE sends email to user's email. Auth0 gives user details to BE> uses auth0 action webhook,

const domain = "dev-5jyytnen4wy6mk4k.us.auth0.com";
const clientId = "tlT8WOhz4qRsX77vjplaXeQAldHJ0W7h";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin}}
    >
    <App /></Auth0Provider>
  </StrictMode>,
)
