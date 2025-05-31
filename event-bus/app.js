const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:3000/events', event).catch(() => {});
  axios.post('http://localhost:3001/events', event).catch(() => {});
  axios.post('http://localhost:3002/events', event).catch(() => {});
  axios.post('http://localhost:3003/events', event).catch(() => {});

  res.json({ status: 'OK' });
});

module.exports = app;
