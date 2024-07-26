const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const app = express();
app.use(bodyParser.json());

let messages = [];

// Endpoint to get messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Endpoint to post a new message
app.post('/api/messages', (req, res) => {
    const { username, message } = req.body;
    if (username && message) {
        messages.push({ username, message, timestamp: new Date() });
    }
    res.status(201).send();
});

// Cron job to reset messages daily at midnight
cron.schedule('0 0 * * *', () => {
    messages = [];
    console.log('Messages reset at midnight');
});

module.exports = app;
