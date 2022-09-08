const express = require("express");
const dotenv = require("dotenv").config;
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000; //not working
const connectDB  = require("./config/db");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/api/upcoming_sessions", require("./routes/upcoming_sessions_routes"));
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
