import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { creasteRoot } from 'react-dom/client';


const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode> 
);
