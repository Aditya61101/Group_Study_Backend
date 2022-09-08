const asyncHandler= require('express-async-handler');

const getUpcomingSession = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get upcoming sessions" });
});

const postUpcomingSession = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "post upcoming sessions" });
});

const putUpcomingSession = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please create the upcoming session before editing it!");
  }
  res.status(200).json({ message: "edit upcoming sessions" });
});

const deleteUpcomingSession = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete upcoming sessions" });
});
module.exports = {
  getUpcomingSession,
  putUpcomingSession,
  deleteUpcomingSession,
  postUpcomingSession,
};
