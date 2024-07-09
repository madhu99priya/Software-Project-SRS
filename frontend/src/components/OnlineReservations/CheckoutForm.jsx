import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

// eslint-disable-next-line react/prop-types
export default function CheckoutForm({ setShowModal, confirmBooking }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      confirmBooking();
      setMessage("Payment successful!");
      alert("Payment successful!");
      setShowModal(false);
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "2rem",
        }}
      >
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        <button type="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
