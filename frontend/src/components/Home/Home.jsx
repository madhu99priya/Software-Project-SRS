import React from "react";
import Branding from "../Branding/Branding.jsx";
import Reasons from "../Reasons/Reasons.jsx";
import "./Home.css";
import Plans from "../Plans/Plans.jsx";
import Join from "../Join/Join.jsx";
import OnlineReservations from "../OnlineReservations/Onlinereservations.jsx";
import ContactUs from "../ContactUs/ContactUs.jsx";
import Footer from "../Footer/Footer.jsx";

const Home = () => {
  return (
    <div>
      <section id="home">
        <Branding />
      </section>

      <section id="services">
        <Reasons />
      </section>

      <section id="packages">
        <Plans />
        {/* <Join /> */}
      </section>

      <section id="onlinereservations">
        <OnlineReservations />
      </section>

      <section id="contactus">
        <ContactUs />
        <Footer />
      </section>
    </div>
  );
};

export default Home;
