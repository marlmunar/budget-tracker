import asyncHandler from "express-async-handler";

// @desc Register User
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Hello, this is register user path",
  });
});

// @desc Login User
// @route POST /api/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Hello, this is login user path",
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
// @route GET /api/user/profile/:id
// @access PUBLIC
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is get profile path",
  });
});

// @desc Update Profile
// @route PUT /api/user/profile/:id
// @access PUBLIC
const updateProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is update profile path",
  });
});

export { registerUser, loginUser, logoutUser, getProfile, updateProfile };
