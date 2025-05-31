const express = require('express');
const router = express.Router();

// Mock database
let posts = [];
let nextId = 1;
// Middleware to parse JSON bodies

// router.use(express.json());

// Route to get all posts
router.get('/posts', (req, res) => {
  res.json(posts);
});

// Route to add a new post

router.post('/posts', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Post title is required' });
  }

  const newPost = {
    id: nextId++,
    title: title.trim(),
    comments: [],
    commentText: '',
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});
