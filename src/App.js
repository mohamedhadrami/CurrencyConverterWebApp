// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'

import Home from './components/Home/Home';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import Crypto from './components/Crypto/Crypto';
import Stocks from './components/Stocks/Stocks';
import About from './components/About/About';
import Vitals from './components/Vitals/Vitals';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/CurrencyConverter" className="nav-link">Currency Converter</Link>
          <Link to="/Crypto" className="nav-link">Crypto</Link>
          <Link to="/Stocks" className="nav-link">Stock Market</Link>
          <Link to="/About" className="nav-link">About</Link>
          <Link to="Vitals" className="nav-link">Vitals</Link>
        </div>
        <br/>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CurrencyConverter" element={<CurrencyConverter />} />
        <Route path="/Crypto" element={<Crypto />} />
        <Route path="/Stocks" element={<Stocks />} />
        <Route path="/About" element={<About />} />
        <Route path="Vitals" element={<Vitals />} />
      </Routes>
    </Router>
  );
};

export default App;
