import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  deleteUser,
  getUserByUserId, // Make sure this function is imported
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.get("/userId/:userId", getUserByUserId); // Add this line

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
