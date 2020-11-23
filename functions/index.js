const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllEvents
} = require('./APIs/events')

app.get('/events', getAllEvents);
exports.api = functions.https.onRequest(app);