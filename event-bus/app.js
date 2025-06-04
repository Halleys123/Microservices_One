const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const eventList = [];

app.post('/events', (req, res) => {
  const event = req.body;

  eventList.push(event);

  axios.post('http://posts-custom-ip:3000/events', event).catch(() => {});
  axios.post('http://localhost:3001/events', event).catch(() => {});
  axios.post('http://localhost:3002/events', event).catch(() => {});
  axios.post('http://localhost:3003/events', event).catch(() => {});

  res.json({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(eventList);
});

module.exports = app;
