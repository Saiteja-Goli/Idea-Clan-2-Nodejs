
const mongoose = require('mongoose');

// Define the schema for user posts
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Create a model for user posts
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
