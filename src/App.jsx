import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';
import Player from './Components/Player/Player';

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/player" element={<Player />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;