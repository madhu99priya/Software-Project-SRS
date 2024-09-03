import React, { useState } from "react";
import "./Memberplans.css";
import { plansData } from "../../../data/plansData.jsx";
import whiteTick from "../../assets/whiteTick.png";
import Modal from "../../components/Modal/Modal.jsx";
import Payment from "../OnlineReservations/Payment.jsx";
import axios from "axios";

const Plans = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const confirmSubscription = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`http://localhost:3000/api/users/userId/${userId}`, {
        membershipType: selectedPlan.name,
      });

      setIsSubscribed(true); 
      setShowModal(false);
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  return (
    <div className="plans-container-n">
      <div className="programs_header" style={{ gap: "2.4rem" }}>
        <span>Plans for</span>
        <span className="stroke-text"> Badminton </span>
      </div>

      <div className="plans">
        {plansData.map((plan) => (
          <div className="plan" key={plan.id}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>Rs. {plan.price}</span>

            <div className="features">
              {plan.features.map((feature, index) => (
                <div className="feature" key={index}>
                  <span style={{ fontSize: "10px" }}>
                    <img src={whiteTick} alt="" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {isSubscribed && selectedPlan?.id === plan.id ? (
              <button className="subscribed-button">Subscribed</button>
            ) : (
              <button
                onClick={() => handleSubscribeClick(plan)}
                className="button"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p>
            Confirm subscription to the {selectedPlan.name} plan for Rs.{" "}
            {selectedPlan.price}?
          </p>
          <Payment
            setShowModal={() => setShowModal(false)}
            confirmBooking={confirmSubscription}
          />
        </Modal>
      )}
    </div>
  );
};

export default Plans;
