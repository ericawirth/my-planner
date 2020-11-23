const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllEvents,
    postOneEvent,
    deleteEvent,
    editEvent,
} = require('./APIs/events')

const {
    loginUser,    
    signUpUser,
    getUserDetail,
    updateUserDetails
} = require('./APIs/users')

app.get('/events', auth, getAllEvents);
app.post('/event', auth, postOneEvent);
app.delete('/event/:eventId', auth, deleteEvent);
app.put('/event/:eventId', auth, editEvent);

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user', auth, updateUserDetails);
app.get('/user', auth, getUserDetail);

exports.api = functions.https.onRequest(app);