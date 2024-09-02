// userroute.js
import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  deleteUser,
  getUserByUserId,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/userId/:userId", getUserByUserId); // Ensure this route is used correctly

router.put("/:id", updateUser); // This should match the ID being used in frontend

router.delete("/:id", deleteUser);

export default router;
