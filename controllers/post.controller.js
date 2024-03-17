const Post = require('../models/post.model');

const postController = {
  // Controller to post data
  createPost: async (req, res) => {
    try {
      const { content } = req.body;
      const userId = req.user.id; // Get the user ID from the authenticated user
  
      // Create a new post
      const newPost = new Post({
        user: userId,
        content: content
      });
  
      // Save the post to the database
      await newPost.save();
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Failed to create post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  // Controller to retrieve user's own posts
  getUserPosts: async (req, res) => {
      try {
        const userId = req.user.id; // Get the user ID from the authenticated user
    
        // Find all posts belonging to the user
        const userPosts = await Post.find({ user: userId });
    
        if (userPosts.length === 0) {
          return res.status(200).json({ message: 'No posts found for the user' });
        }
    
        res.status(200).json({ posts: userPosts });
      } catch (error) {
        console.error('Failed to retrieve user posts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
};

module.exports = postController;
