const express = require("express");
require("dotenv").config;
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT;
const connectDB  = require("./config/db");
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//available routes
app.use("/api/upcoming_sessions", require("./routes/upcomingSessionsRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/userRegister", require("./routes/registeredSessionRoute"));

app.listen(port, () => {
  console.log(`server started on ${port}`);
});