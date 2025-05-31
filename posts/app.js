// express is used to create a web server
const express = require('express');
// crypto is used to generate random IDs for posts
const { randomBytes } = require('crypto');
// Long Description for body-parser:
// body-parser is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  const { postId } = req.query;
  if (postId) {
    if (!posts[postId]) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json({
      message: 'This is a placeholder for posts',
      post: posts[postId],
    });
  }
  res.json({
    message: 'This is a placeholder for posts',
    post: posts,
  });
});
app.post('/posts', (req, res) => {
  const { post } = req.body;
  if (!post || post.trim() === '') {
    return res
      .status(400)
      .json({ error: 'Post ID and comment text are required' });
  }

  const postId = randomBytes(16).toString('hex');
  posts[postId] = {
    id: postId,
    post: post.trim(),
  };

  axios.post('http://localhost:3005/events', {
    type: {
      name: 'POST',
      action: 'CREATED',
    },
    data: posts[postId],
  });

  return res.status(201).json({
    message: 'Comment added successfully',
    postId: postId,
    post: posts[postId].post,
  });
});

app.post('/events', (req, res) => {
  console.log(req.body.type);
});

module.exports = app;
