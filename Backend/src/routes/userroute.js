import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  getUserByUserId,
  updateUserByUserId,
  verifyPassword,
  changePassword,
  deleteUserByUserId,
  getMembershipCount,
  getMembershipBreakdown,
  getTotalCountForMembership,
  getUsersByIds,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.post("/bulk", getUsersByIds);

router.get("/membership-count", getMembershipCount);
router.get("/membership-breakdown", getMembershipBreakdown);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/userId/:userId", getUserByUserId);

router.put("/:id", updateUser);
router.put("/userId/:userId", updateUserByUserId);

router.post("/userId/:userId/verify-password", verifyPassword);
router.put("/userId/:userId/change-password", changePassword);

router.delete("/userId/:userId", deleteUserByUserId);

// Get total Member count for a specific Membership Type
router.get("/membership/:membershipType/total", getTotalCountForMembership);

export default router;
