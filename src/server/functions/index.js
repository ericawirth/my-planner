//index.js

const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllTodos
} = require('./APIs/todos')

app.get('/todos', getAllTodos);

exports.api = functions.https.onRequest(app);

// Post Todo Item
const {
    postOneTodo
} = require('./APIs/todos')

app.post('/todo', postOneTodo);

// Delete Todo item
const {
    deleteTodo
} = require('./APIs/todos')

app.delete('/todo/:todoId', deleteTodo);

// Edit Todo item
const {
    editTodo
} = require('./APIs/todos')

app.put('/todo/:todoId', editTodo);


// import a loginUser method and assign the POST route to it
const {
    loginUser
} = require('./APIs/users')

// Users
app.post('/login', loginUser);