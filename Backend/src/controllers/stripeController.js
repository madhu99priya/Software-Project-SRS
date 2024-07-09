import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from "../../config.js";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

// Create a new payment intent
export const createPaymetIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

export const config = (req, res) => {
  res.send({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
};
