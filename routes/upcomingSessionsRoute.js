const express = require("express");
const router = express.Router();
const {
  createUpcomingSession,
  readUpcomingSessions,
  updateUpcomingSession,
  deleteUpcomingSession,
  readUpcomingSession,
} = require("../controllers/upcomingSessionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createUpcomingSession);
router.get("/", protect, readUpcomingSessions);
router.get("/:id", protect, readUpcomingSession);
router.put("/:id", protect, updateUpcomingSession);
router.delete("/:id", protect, deleteUpcomingSession);
module.exports = router;
