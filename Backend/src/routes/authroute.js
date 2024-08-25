import express from "express";
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
const router = express.Router();

router.post("/verifyToken", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace with your JWT secret
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

module.exports = router;
