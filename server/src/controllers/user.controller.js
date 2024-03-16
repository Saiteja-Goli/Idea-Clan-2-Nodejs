const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()
exports.registerUser = async (req, res) => {
  console.log("Entering to register");
  try {
    const { name, email, username, password } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();
    console.log("User saved successfully:", newUser);
    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    console.log("Token generated:", token);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Failed to save user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};

exports.loginUser = async (req, res) => {
  console.log("entering to login")
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET_KEY);
    res.status(200).json({
      user: { id: user._id, email: user.email, fullName: user.fullName },
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

