import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home/Home';
import './App.css'
import Landing from './Components/Landing/Landing';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Landing />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
