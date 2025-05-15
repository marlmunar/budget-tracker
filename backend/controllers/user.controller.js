import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// @desc Register User
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc Login User
// @route POST /api/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPasswords(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc Logout User
// @route POST /api/logout
// @access PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Hello, this is logout user path",
  });
});

// @desc Get Profile
// @route GET /api/user/profile/
// @access PRIVATE
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is get profile path",
  });
});

// @desc Update Profile
// @route PUT /api/user/profile/
// @access PRIVATE
const updateProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is update profile path",
  });
});

export { registerUser, loginUser, logoutUser, getProfile, updateProfile };
