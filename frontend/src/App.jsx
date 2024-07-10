// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from '../src/components/Navbar/Navbar.jsx';
// import Home from '../src/components/Home/Home.jsx';
// import Plans from './components/Plans/Plans.jsx';
// import Reasons from './components/Reasons/Reasons.jsx';
// import SignIn from './components/Signin/Signin.jsx';
// import SignUp from './components/SignUp/Signup.jsx';
// import Signuporin from './components/Signuporin/Signuporin.jsx';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<Reasons />} />
//         <Route path="/packages" element={<Plans />} />
//         <Route path='/memberlogin' element = {<Signuporin />} />
//         {/* <Route path="/contact" element={<Contact />} /> */}
//       </Routes>
//     </Router>
//   );
// };


// export default App;







// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from '../src/components/Navbar/Navbar.jsx';
// import Home from '../src/components/Home/Home.jsx';
// import Plans from './components/Plans/Plans.jsx';
// import Reasons from './components/Reasons/Reasons.jsx';
// import Signuporin from './components/Signuporin/Signuporin.jsx';

// const App = () => {

//   return (
//     <div>
//       < Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path='/memberlogin' element={<Signuporin />} />
//       </Routes>
//     </div>
//   );
// };

// const WrappedApp = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default WrappedApp;

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
        {/* <Route path='/adminpanel' element = {<Admin />} /> */}
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
