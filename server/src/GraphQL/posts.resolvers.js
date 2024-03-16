require("dotenv").config()
const jwt = require('jsonwebtoken');
const Post = require('../models/post.model');

const postResolvers = {
  Query: {
    getUserPosts: async (_, __, { req }) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          throw new Error("Token not provided.");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
          throw new Error("Invalid token.");
        }

        const userId = decoded.id;
        const userPosts = await Post.find({ user: userId });
        return userPosts;
      } catch (error) {
        console.error('Error fetching user posts:', error);
        throw new Error("Failed to fetch user posts.");
      }
    },
  },

  Mutation: {
    createPost: async (_, { content }, { req }) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          throw new Error("Token not provided.");
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
          throw new Error("Invalid token.");
        }

        const userId = decoded.id;
        const newPost = new Post({ user: userId, content });
        await newPost.save();
        return newPost;
      } catch (error) {
        console.error('Error creating post:', error);
        throw new Error("Failed to create post. Please try again.");
      }
    },
  },
};

module.exports = { postResolvers };
