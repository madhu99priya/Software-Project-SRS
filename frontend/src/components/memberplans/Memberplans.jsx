import React, { useState, useEffect } from "react";
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
  const [subscriptionExpiryDate, setSubscriptionExpiryDate] = useState(null);

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const confirmSubscription = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const currentDate = new Date();
      let expiryDate;

      
      if (selectedPlan.name === "BRONZE SHUTTLE") {
        expiryDate = new Date(currentDate.getTime() + 6 * 7 * 24 * 60 * 60 * 1000); // 6 weeks
      } else if (selectedPlan.name === "SILVER SHUTTLE") {
        expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3)); // 3 months
      } else if (selectedPlan.name === "GOLD SHUTTLE") {
        expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6)); // 6 months
      }

      await axios.put(`http://localhost:3000/api/users/userId/${userId}`, {
        membershipType: selectedPlan.name,
        subscriptionStartDate: currentDate,
      });

     
      setIsSubscribed(true);
      setSubscriptionExpiryDate(expiryDate);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:3000/api/users/userId/${userId}`);
        const user = response.data;
        const { membershipType, subscriptionStartDate } = user;

        if (membershipType && subscriptionStartDate) {
          const startDate = new Date(subscriptionStartDate);
          let expiryDate;

          
          if (membershipType === "BRONZE SHUTTLE") {
            expiryDate = new Date(startDate.getTime() + 6 * 7 * 24 * 60 * 60 * 1000); // 6 weeks
          } else if (membershipType === "SILVER SHUTTLE") {
            expiryDate = new Date(startDate.setMonth(startDate.getMonth() + 3)); // 3 months
          } else if (membershipType === "GOLD SHUTTLE") {
            expiryDate = new Date(startDate.setMonth(startDate.getMonth() + 6)); // 6 months
          }

          if (new Date() < expiryDate) {
            setIsSubscribed(true);
            setSubscriptionExpiryDate(expiryDate);
            setSelectedPlan(plansData.find(plan => plan.name === membershipType));
          } else {
            setIsSubscribed(false); // Subscription expired
          }
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };

    checkSubscriptionStatus();
  }, []);

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
