import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar.js';
import EplStandings from './EplStandings.js';
import LaLigaStandings from './LaLigaStandings.js';
import UclStandings from './UclStandings.js';
import UelStandings from './UelStandings.js';
import HomePage from './HomePage.js';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ucl" element={<UclStandings />} />
          <Route path="/uel" element={<UelStandings />} />
          <Route path="/epl" element={<EplStandings />} />
          <Route path="/laliga" element={<LaLigaStandings />} />
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
