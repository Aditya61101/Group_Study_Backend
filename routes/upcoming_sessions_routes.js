const express = require("express");
const router = express.Router();
const {
  getUpcomingSession,
  postUpcomingSession,
  putUpcomingSession,
  deleteUpcomingSession,
} = require("../controllers/upcoming_session_controller");

router.get("/", getUpcomingSession);
router.post("/", postUpcomingSession);
router.put("/:id", putUpcomingSession);
router.delete("/:id", deleteUpcomingSession);
module.exports = router;
