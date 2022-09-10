const asyncHandler = require("express-async-handler");
const UpcomingSessions = require("../models/upcomingSessionModel");
const User = require("../models/userModel");

const readUpcomingSessions = asyncHandler(async (req, res) => {
  const upComingSessions = await UpcomingSessions.find();
  // console.log(upComingSessions);
  if (upComingSessions) {
    res.status(201).json(upComingSessions);
  }
  else{
    res.status(400).json({error:'No upcoming sessions found!'});
  }
});

const createUpcomingSession = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if(!user){
    res.status(400).json({error:"User not found!"});
  }
  console.log(req.body);
  const upComingSessions = await UpcomingSessions.insertMany({
    user: user.id,
    title: req.body.title,
    subject: req.body.subject,
    startDate: req.body.startDate,
    startTime: req.body.startTime,
    endDate: req.body.endDate,
    endTime: req.body.endTime,
    maxStudents: req.body.maxStudents,
  });
  // console.log(upComingSessions);
  if (upComingSessions) {
    res.status(201).json(upComingSessions);
  }
  else{
    res.status(400).json({error:'Unable to create a session'});
  }
});

const updateUpcomingSession = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const upComingSession = await UpcomingSessions.findById(req.params.id);
  if (!upComingSession) {
    res.status(400);
    throw new Error("Please create the upcoming session before editing it!");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //if session is not user's created session then user shouldn't update it
  if (upComingSession.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedSession = await UpcomingSessions.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedSession);
});

const deleteUpcomingSession = asyncHandler(async (req, res) => {
  const upComingSession = await UpcomingSessions.findById(req.params.id);
  if (!upComingSession) {
    res.status(400);
    throw new Error("Please create the upcoming session before deleting it!");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //if session is not user's created session then user shouldn't delete it
  if (upComingSession.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await UpcomingSessions.findByIdAndDelete(req.params.id);
  res.status(201).json({ id: req.params.id });
});
module.exports = {
  createUpcomingSession,
  readUpcomingSessions,
  updateUpcomingSession,
  deleteUpcomingSession,
};
