const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email", "Enter a valid Email Id").isEmail(),
    body("password", "Password must be of at least 6 characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email", "Enter a valid Email Id").isEmail(),
    body("password", "Password must be of at least 6 characters").isLength({
      min: 6,
    }),
  ],
  loginUser
);

module.exports = router;
