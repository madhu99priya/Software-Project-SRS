import express from "express";
import {
  createAnnouncement,
  getActiveAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

// Route to create an announcement
router.post("/", createAnnouncement);

// Route to get active announcements
router.get("/", getActiveAnnouncements);

// Route to update an announcement
router.put("/:id", updateAnnouncement); // PUT for editing an announcement by ID

// Route to delete an announcement
router.delete("/:id", deleteAnnouncement); // DELETE for removing an announcement by ID

export default router;
