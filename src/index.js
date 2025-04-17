// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Your main app component
import "./styles/index.css"; // Your CSS file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* Main app component */}
  </React.StrictMode>
);
