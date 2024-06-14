import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Home from '../src/components/Home/Home.jsx';
import Plans from './components/Plans/Plans.jsx';
import Reasons from './components/Reasons/Reasons.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Reasons />} />
        <Route path="/packages" element={<Plans />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
};


export default App;
