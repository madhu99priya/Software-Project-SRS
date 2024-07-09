import express from "express";
import { config, createPaymetIntent } from "../controllers/stripeController.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymetIntent);

router.get("/config", config);

export default router;
