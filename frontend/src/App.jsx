import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Home from '../src/components/Home/Home.jsx';
import Signuporin from './components/Signuporin/Signuporin.jsx';
import Admin from './components/Admin/Admin.jsx';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/memberlogin']; 

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberlogin" element={<Signuporin />} />
        <Route path='/adminpanel' element = {<Admin />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
