const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

/**
 * @type {Object.<string, Array<{ id: string, content: string }>>}
 */
const commentsByPostId = {};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/posts/:id/comment', (req, res, next) => {
  const { id } = req.params;

  console.log(commentsByPostId);
  const comments = commentsByPostId[id] || null;
  if (!comments) {
    return res.json({
      message: 'There are no messages on this post',
      success: true,
      data: [],
    });
  }
  return res.json({
    message: 'All messages on the comment are',
    success: true,
    data: comments,
  });
});

app.get('/posts/comment', (req, res) => {
  const { idList } = req.body;

  if (!Array.isArray(idList) || idList.length === 0) {
    return res.json({
      message: 'Please provide a non-empty array of post IDs in idList',
      success: false,
      data: [],
    });
  }

  const result = idList.map((id) => ({
    postId: id,
    comments: commentsByPostId[id] || [],
  }));

  return res.json({
    message: 'Comments for the provided post IDs',
    success: true,
    data: result,
  });
});

app.post('/posts/:id/comment', (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const commentId = randomBytes(4).toString('hex');

  if (!text) {
    return res.json({
      message: "Please provide comment message, comment can't be empty",
      success: false,
    });
  }
  if (!id) {
    return res.json({
      message:
        'You need to provide ID of post on which comment should be added',
      success: false,
    });
  }

  // Check if there is already some content other create an array for that message
  if (typeof commentsByPostId[id] != typeof []) commentsByPostId[id] = [];

  commentsByPostId[id].push({
    id: commentId,
    content: text,
    status: 'pending',
  });

  axios
    .post('http://localhost:3005/events', {
      type: {
        name: 'COMMENT',
        action: 'UPDATED',
      },
      data: {
        postId: id,
        commentId: commentId,
        content: text,
        status: 'pending',
      },
    })
    .catch((err) => {});

  return res.json({
    message: 'Your comment was added successfuly',
    data: {
      postId: id,
      commentId: commentId,
      content: text,
    },
  });
});

app.post('/events', (req, res) => {
  console.log(req.body.type);
  const { type, body } = req.body;
  if (type.name == 'COMMENT' && type.action == 'UPDATED') {
    commentsByPostId[body.postId].status = data.status || 'pending';
  }
});

module.exports = app;
