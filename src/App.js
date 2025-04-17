// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import "./styles/index.css";

// Main app component with routing
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<Posts />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
