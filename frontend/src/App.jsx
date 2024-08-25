import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import Home from "../src/components/Home/Home.jsx";
import Signuporin from "./components/Signuporin/Signuporin.jsx";
import Admin from "./components/Admin/Admin.jsx";
import OnlineReservations from "./components/OnlineReservations/Onlinereservations.jsx";
import Member_account from "./components/Member_account/Member_account.jsx";
import Dashboard from "./components/Member_account/Dashboard.jsx";
//import Signup from './components/SignUp/Signupprebuilt.tsx'
import Plans from "./components/Plans/Plans.jsx";

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = [
    "/memberlogin",
    "/online-reservations",
    "/memberaccount",
    "/packages",
  ];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberlogin" element={<Signuporin />} />
        {/* <Route path="/memberlogin" element={< Signup/>} /> */}

        <Route path="/adminpanel" element={<Admin />} />
        <Route path="/online-reservations" element={<OnlineReservations />} />
        <Route path="/memberaccount" element={<Member_account />} />
        <Route path="/packages" element={<Plans />} />
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
