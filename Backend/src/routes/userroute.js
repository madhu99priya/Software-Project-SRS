import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  deleteUser,
  getUserByUserId,
  updateUserByUserId
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/userId/:userId", getUserByUserId); 

router.put("/:id", updateUser); 
router.put("/userId/:userId", updateUserByUserId); 

router.delete("/:id", deleteUser);

export default router;
