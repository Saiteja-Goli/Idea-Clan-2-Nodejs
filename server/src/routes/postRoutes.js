const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const verifyToken = require("../middleware/verifyToken");

// Route to create a new post
router.post("/posts", verifyToken, postController.createPost);

// Route to retrieve user's own posts
router.get("/posts", verifyToken, postController.getUserPosts);

module.exports = router;
