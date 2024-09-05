import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  membershipType: {
    type: String,
    default: null,
  },
  subscriptionStartDate: {
    type: Date,
    default: null,
  },
  totalBookedHours: {
    type: Number,
    default: 0, 
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const user = mongoose.model("User", userSchema);

export default user;
