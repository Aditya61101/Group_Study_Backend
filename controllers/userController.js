const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

//generate JWT
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
let success=false; 
//to implement signup functionality
const registerUser = asyncHandler(
  async (req, res) => {
    // if there are errors, then just return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const { email, password } = req.body;
    //if both the fields are not filled
    if (!email || !password) {
      res.status(400).json({success,error:"Please fill all the fields!"});
    }
    //check if user register
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({success,error:"Email ID already exists"});
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
      console.log(user);
      console.log('user registered!');
      success=true;
      res.status(201).json({
        success,
        id: user._id,
        email: user.email,
        token: genToken(user._id),
      });
    } else {
      res.status(400).json({success,error:"Invalid user data"});
    }
  }
);

//to implement login functionality
const loginUser = asyncHandler(
  async (req, res) => {
    // if there are errors, then just return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({success,error:"Please fill all the fields!"});
    }
    const userExists = await User.findOne({ email });
    //check if the user exists and the password matches or not
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      console.log('Logged in');
      success=true;
      res.status(201).json({
        success,
        id: userExists._id,
        email: userExists.email,
        token: genToken(userExists._id),
      });
    } else {
      res.status(400).json({success,error:"Invalid credentials"});
    }
  }
);

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
