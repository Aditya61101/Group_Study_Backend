const mongoose = require("mongoose");

const upcomingSessionsSchema = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  title: {
    type: String,
    required: [true, "Please add a title of the session"],
  },
  subject: {
    type: String,
  },
  startDate: {
    type: Date,
    required: [true, "Please mention start Date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please mention end Date"],
  },
  maxStudents: {
    type: Number,
    min: 0,
    max: 70,
    required: [true, "Please mention maximum number of students."],
  },
});
module.exports = mongoose.model("UpcomingSessions", upcomingSessionsSchema);
