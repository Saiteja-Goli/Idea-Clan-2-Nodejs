const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userResolvers = {
    Mutation: {
        registerUser: async (_, { name, email, username, password }) => {
            try {
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    return { message: 'Email already registered' };
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ name, email, username, password: hashedPassword });
                await newUser.save();

                const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
                return { user: newUser, message: 'User registered successfully', accessToken: token };
            } catch (error) {
                throw new Error('Failed to save user: ' + error.message);
            }
        },

        loginUser: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return { message: "Invalid credentials" };
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return { message: "Invalid credentials" };
                }

                const token = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET_KEY);
                return {
                    user: { id: user._id, email: user.email, name: user.name },
                    message: "Login successful",
                    accessToken: token,
                };
            } catch (error) {
                throw new Error('Login error: ' + error.message);
            }
        }
    }
};

module.exports = { userResolvers };