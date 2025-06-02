const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log(type, data);

  if (type.name == 'COMMENT' && type.action == 'UPDATED') {
    if (data.status === 'pending') {
      let status = 'approved';
      if (data.content.includes('orange')) {
        status = 'rejected';
      }

      await axios
        .post('http://localhost:3005/events', {
          type: {
            name: 'COMMENT',
            action: 'UPDATED',
          },
          data: {
            postId: data.postId,
            commentId: data.commentId,
            content: data.content,
            status,
          },
        })
        .catch((err) => {});
    }
  }

  res.send({});
});

module.exports = app;
