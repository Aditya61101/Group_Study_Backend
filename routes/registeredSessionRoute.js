const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registeredSession,
} = require("../controllers/registeredSessionsController");

router.post("/:id", protect, registeredSession);
module.exports = router;
