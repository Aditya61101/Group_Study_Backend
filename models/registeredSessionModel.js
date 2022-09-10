const mongoose = require("mongoose");

const registeredSession = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UpcomingSessions",
  },
});
module.exports = mongoose.model("RegisteredSession",registeredSession);
