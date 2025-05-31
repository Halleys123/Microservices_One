const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
/**
 * Stores posts and their associated comments.
 * Structure:
 * {
 *   [postId]: {
 *     id: string,
 *     post: string,
 *     comments: Array<{
 *       id: string,
 *       content: string
 *     }>
 *   }
 * }
 * @type {Object.<string, { id: string, post: string, comments: Array<{ id: string, content: string, status: 'approved' | 'rejected' | 'pending' }> }>}
 */
const posts = {};

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  if (type.name == 'POST' && type.action == 'CREATED') {
    const { id, post } = data;
    if (posts[id]) return;

    posts[id] = {
      id: id,
      post: post,
      comments: [],
    };
  } else if (type.name == 'COMMENT' && type.action == 'CREATED') {
    const { postId, commentId, content } = data;
    const post = posts[postId];
    post.comments.push({ id: commentId, content: content });
  } else {
    console.log('Unkown event arised');
  }
  console.log(posts);
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

module.exports = app;
