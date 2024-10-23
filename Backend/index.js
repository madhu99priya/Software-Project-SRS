import express from "express";
import mongoose from "mongoose";
import bookingRoutes from "./src/routes/booking.js";
import userRoutes from "./src/routes/userroute.js";
import cors from "cors";
import adminRoutes from "./src/routes/admin.js";
import dotenv from "dotenv";
import stripeRoutes from "./src/routes/stripe.js";
import announcementRoutes from "./src/routes/announcement.js";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

// Define routes
app.use("/api/stripe", stripeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/announcements", announcementRoutes);

app.use("/", (req, res) => {
  res.send("Server is running");
});


console.log(process.env.MONGODB_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // Options to avoid deprecation warnings
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
