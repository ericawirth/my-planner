const app = require('express')();
const functions = require('firebase-functions');
const auth = require('./util/auth');

const {
    getAllEvents,
    getOneEvent,
    postOneEvent,
    deleteEvent,
    editEvent,
} = require('./APIs/events')

app.get('/events', auth, getAllEvents);
app.post('/event', auth, postOneEvent);
app.get('/event/:eventId', auth, getOneEvent);
app.delete('/event/:eventId', auth, deleteEvent);
app.put('/event/:eventId', auth, editEvent);

const {
    getAllClasses,
    getOneClass,
    postOneClass,
    deleteClass,
    editClass,
} = require('./APIs/classes')

app.get('/classes', auth, getAllClasses);
app.post('/class', auth, postOneClass);
app.get('/class/:classId', auth, getOneClass);
app.delete('/class/:classId', auth, deleteClass);
app.put('/class/:classId', auth, editClass);

const {
    loginUser,    
    signUpUser,
    getUserDetail,
    updateUserDetails
} = require('./APIs/users')

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user', auth, updateUserDetails);
app.get('/user', auth, getUserDetail);

exports.api = functions.https.onRequest(app);