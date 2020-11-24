const { db } = require('../util/admin');

exports.getAllTodos = (request, response) => {
    db.collection('todos')
        .where('email', '==', request.user.email)
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                console.log(doc);
                todos.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            return response.json(todos);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.getOneTodo = (request, response) => {
    db.doc(`/todos/${request.params.todoId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json(
                    {
                        error: 'todo not found'
                    });
            }
            if (doc.data().email !== request.user.email) {
                return response.status(403).json({ error: "UnAuthorized" })
            }
            let todoData = doc.data();
            todoData.todoId = doc.id;
            return response.json(todoData);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: error.code });
        });
};

exports.postOneTodo = (request, response) => {

    const newTodoItem = {
        subject: request.body.subject,
        email: request.user.email,
        title: request.body.title,
        start: request.body.start,
        time: request.body.time,
        completed: request.body.completed,
        createdAt: new Date().toISOString()
    }
    db.collection('todos')
        .add(newTodoItem)
        .then((doc) => {
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Something went wrong' });
            console.error(err);
        });
};

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({
                    error: 'Todo not found'
                })
            }
            if (doc.data().email !== request.user.email) {
                return response.status(403).json({ error: "UnAuthorized" })
            }
            return document.delete();
        })
        .then(() => {
            return response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editTodo = (request, response) => {
    if (request.body.todoId || request.body.createdAt) {
        response.status(403).json({ message: 'Not allowed to edit' });
    }
    let document = db.collection('todos').doc(`${request.params.todoId}`);
    document.update(request.body)
        .then(() => {
            return response.json({ message: 'Updated successfully' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({
                error: err.code
            });
        });
};