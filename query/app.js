// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

/**
 * @type {Object.<string, { id: string, post: string, comments: Object.<string, { content: string, status: 'approved' | 'rejected' | 'pending' }> }>}
 */
const posts = {};

function handleEvent(type, data) {
  if (type.name == 'POST' && type.action == 'CREATED') {
    const { id, post } = data;
    if (posts[id]) return;

    posts[id] = {
      id: id,
      post: post,
      comments: {},
    };
  } else if (type.name == 'COMMENT' && type.action == 'UPDATED') {
    const { postId, commentId, status } = data;
    let { content } = data;
    const post = posts[postId];

    if (status == 'pending')
      content = '<i>This comment is waiting moderation</i>';
    if (status == 'rejected')
      content = '<b style="color: #FF7F7F;">This comment has been rejected</b>';

    post.comments[commentId] = { content: content, status: status };
  } else {
    console.log('Unkown event arised');
  }
}

// Fetch and process past events on startup
(async function () {
  try {
    const res = await fetch('http://event-bus-custom-ip:3005/events');
    if (!res.ok) throw new Error('Failed to fetch events');
    const events = await res.json();
    for (const event of events) {
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.error('Error fetching events:', err.message);
  }
})();

app.post('/events', (req, _) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  console.log(posts);
});

app.get('/posts', (_, res) => {
  res.json(posts);
});

module.exports = app;
