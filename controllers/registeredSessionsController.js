const asyncHandler = require("express-async-handler");
const UpcomingSessions = require("../models/upcomingSessionModel");
const RegisteredSession = require("../models/registeredSessionModel");

const registeredSession = asyncHandler(async (req, res) => {
  let success = false;
  const user = await RegisteredSession.findOne({
    user: req.user.id,
    session: req.params.id,
  });
  const session = await UpcomingSessions.findById(req.params.id);
  let countSession = await RegisteredSession.count(req.params.id);
  if (user) {
    res
      .status(400)
      .json({
        success,
        error: "User has already registered!",
        sessionId: req.params.id,
      });
  } else if (session.maxStudents <= countSession) {
    res
      .status(400)
      .json({ success, error: "Session Fulled!", sessionId: req.params.id });
  } else {
    const regSession = await RegisteredSession.insertMany({
      user: req.user.id,
      session: session.id,
    });
    if (regSession) {
      success = true;
      res.status(201).json({
        success,
        message: "User Registered successfully!",
        sessionId: req.params.id,
      });
    } else {
      res.status(400).json({
        success,
        error: "User not registered",
        sessionId: req.params.id,
      });
    }
  }
});
module.exports = { registeredSession };
