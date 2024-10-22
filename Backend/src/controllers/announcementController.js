import Announcement from "../models/Announcement.js";

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { message, endDate } = req.body;

    const announcement = new Announcement({
      message,
      endDate,
    });
    await announcement.save();
    res.status(201).send({ success: true, announcement });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

// Get active announcements
export const getActiveAnnouncements = async (req, res) => {
  try {
    const currentDate = new Date();
    const announcements = await Announcement.find({
      endDate: { $gte: currentDate },
    });
    res.status(200).send({ success: true, announcements });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Delete expired announcements (end date <= current date)
export const deleteExpiredAnnouncements = async () => {
  try {
    const currentDate = new Date();
    // Delete announcements where endDate is less than or equal to currentDate
    await Announcement.deleteMany({ endDate: { $lte: currentDate } });
    console.log("Expired announcements removed");
  } catch (error) {
    console.error("Error deleting expired announcements:", error.message);
  }
};

// Update an announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, endDate } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { message, endDate },
      { new: true } // Return the updated document
    );

    if (!updatedAnnouncement) {
      return res
        .status(404)
        .send({ success: false, message: "Announcement not found" });
    }

    res.status(200).send({ success: true, announcement: updatedAnnouncement });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Delete an announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res
        .status(404)
        .send({ success: false, message: "Announcement not found" });
    }

    res.status(200).send({ success: true, message: "Announcement deleted" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
