const asyncHandler = require("express-async-handler");
const UpcomingSessions = require("../models/upcomingSessionModel");

const getUpcomingSession = asyncHandler(async (req, res) => {
  const upComingSessions = await UpcomingSessions.find();
  res.status(200).json(upComingSessions);
});

const postUpcomingSession = asyncHandler(async (req, res) => {
  const upComingSessions = await UpcomingSessions.insertMany({
    title: req.body.title,
    subject: req.body.subject,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxStudents: req.body.maxStudents,
  });
  res.status(200).json(upComingSessions);
});

const putUpcomingSession = asyncHandler(async (req, res) => {
  const upComingSession = await UpcomingSessions.findById(req.params.id);
  if (!upComingSession) {
    res.status(400);
    throw new Error("Please create the upcoming session before editing it!");
  }
  const updatedSession = await UpcomingSessions.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedSession);
});

const deleteUpcomingSession = asyncHandler(async (req, res) => {
  const upComingSession = UpcomingSessions.findById(req.params.id);
  if (!upComingSession) {
    res.status(400);
    throw new Error("Please create the upcoming session before deleting it!");
  }
  await UpcomingSessions.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getUpcomingSession,
  putUpcomingSession,
  deleteUpcomingSession,
  postUpcomingSession,
};
