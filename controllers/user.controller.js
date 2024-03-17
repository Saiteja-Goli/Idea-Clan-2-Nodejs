const User = require("../server/src/models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userController = {
  registerUser: async (req, res) => {
    console.log("Entering to register");
    try {
      const { name, email, username, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, username, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      console.log("Token generated:", token);
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Failed to save user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  loginUser: async (req, res) => {
    console.log("Entering to login");
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
  }
};

module.exports = userController;
