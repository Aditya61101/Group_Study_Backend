const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//generate JWT
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "acs!@%6778", {
    expiresIn: "30d",
  });
};
//to implement signup functionality
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //if both the fields are not filled
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  }
  //check if user register
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email ID already exists");
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //creating the user
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//to implement login functionality
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  }
  const userExists = await User.findOne({ email });
  //check if the user exists and the password matches or not
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    res.status(201).json({
      id: userExists._id,
      email: userExists.email,
      token: genToken(userExists._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { _id, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    email: email,
  });
});
module.exports = {
  loginUser,
  registerUser,
  getUser,
};
