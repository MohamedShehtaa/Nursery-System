const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");





// Create new teacher/admin
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const image = req.file ? req.file.path : undefined;

  if (!fullName || !email || !password || !role) {
    res.status(400);
    throw new Error("please add all fields");
  }

  // Check if user exists

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    _id: new mongoose.Types.ObjectId(),
    fullName,
    email,
    role,
    image,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalied user data");
  }
});




const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalied credentials data");
  }
});




const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


module.exports = {
  loginUser,
  registerUser,

}