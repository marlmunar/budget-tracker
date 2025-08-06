import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// @desc Verify Email
// @route POST /api/users/verify
// @access PUBLIC
const verifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(200).json({ available: false });
  }

  return res.status(200).json({ available: true });
});

// @desc Authenticate Password
// @route POST /api/users/authenticate
// @access PUBLIC
const authenticate = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!(await user.matchPasswords(password))) {
    res.status(401);
    throw new Error("You have entered the wrong password");
  }

  return res.status(200).json({ message: "User authenticated" });
});

// @desc Register User
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
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
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get Profile
// @route GET /api/user/profile/
// @access PRIVATE
const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// @desc Update Profile
// @route PUT /api/user/profile/
// @access PRIVATE
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error(`User not found`);
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  if (req.body.email) {
    const email = user.email;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("Email is not available");
    }
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

export {
  verifyEmail,
  authenticate,
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
};
