import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.userId }, "secret_key"); // we have to use variable for the secret key
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("Update request body:", req.body); // Log request body
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    console.log("Updated user:", user); // Log updated user
    res.status(200).send(user);
  } catch (error) {
    console.error("Update error:", error); // Log error details
    res.status(400).send({ error: "Failed to update user" });
  }
};

export const updateUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateFields = { ...req.body };

    // If password is being updated, hash it
    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

    // Find and update the user by userId
    const updatedUser = await User.findOneAndUpdate(
      { userId }, // Ensure userId is unique in your schema
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findOneAndDelete({ userId });
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export const getUserByUserId = async (req, res) => {
  // console.log("Received userId:", req.params.userId); // Debugging line
  try {
    const user = await User.findOne({ userId: req.params.userId });
    // console.log("User found:", user); // Debugging line
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    // console.error("Error fetching user:", error); // Debugging line
    res.status(500).send(error);
  }
};

export const verifyPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Verify the hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ match: false });
    }

    res.status(200).send({ match: true });
  } catch (error) {
    console.error("Password verification error:", error);
    res.status(500).send({ error: "Failed to verify password" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Directly assign the new password; the pre-save hook will hash it
    user.password = newPassword;
    await user.save();

    res.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).send({ error: "Failed to change password" });
  }
};

export const getMembershipCount = async (req, res) => {
  try {
    const membershipCount = await User.countDocuments({
      membershipType: { $ne: null },
    });
    res.status(200).send({ count: membershipCount });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch membership count" });
  }
};

export const getMembershipBreakdown = async (req, res) => {
  try {
    const bronzeCount = await User.countDocuments({
      membershipType: "BRONZE SHUTTLE",
    });
    const silverCount = await User.countDocuments({
      membershipType: "SILVER SHUTTLE",
    });
    const goldCount = await User.countDocuments({
      membershipType: "GOLD SHUTTLE",
    });

    res.status(200).send({
      bronze: bronzeCount,
      silver: silverCount,
      gold: goldCount,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch membership breakdown" });
  }
};

export const getTotalCountForMembership = async (req, res) => {
  try {
    const { membershipType } = req.params;

    const totalMemberships = await User.countDocuments({
      membershipType: membershipType,
    });

    res.status(200).send({ membershipType, totalMemberships });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUsersByIds = async (req, res) => {
  try {
    const { userIds } = req.body;
    const users = await User.find({ userId: { $in: userIds } }).select(
      "userId name"
    );
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
};
