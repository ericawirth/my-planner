const { db } = require('../util/admin');

exports.getAllClasses = (request, response) => {
    db.collection('classes')
        .where('email', '==', request.user.email)
        .get()
        .then((data) => {
            let classes = [];
            data.forEach((doc) => {
                console.log(doc);
                classes.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            return response.json(classes);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.getOneClass = (request, response) => {
    db.doc(`/classes/${request.params.classId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json(
                    {
                        error: 'Class not found'
                    });
            }
            if (doc.data().email !== request.user.email) {
                return response.status(403).json({ error: "UnAuthorized" })
            }
            let classData = doc.data();
            classData.classId = doc.id;
            return response.json(classData);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: error.code });
        });
};

exports.postOneClass = (request, response) => {
    if (request.body.classTitle.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    const newClassItem = {
        classTitle: request.body.classTitle,
        email: request.user.email,
        classProfessor: request.body.classProfessor,
        classSchedule: request.body.classSchedule,
        classZoom: request.body.classZoom,
        color: request.body.color,
        createdAt: new Date().toISOString()
    }
    db.collection('classes')
        .add(newClassItem)
        .then((doc) => {
            const responseClassItem = newClassItem;
            responseClassItem.id = doc.id;
            return response.json(responseClassItem);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Something went wrong' });
            console.error(err);
        });
};

exports.deleteClass = (request, response) => {
    const document = db.doc(`/classes/${request.params.classId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({
                    error: 'Class not found'
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

exports.editClass = (request, response) => {
    if (request.body.classId || request.body.createdAt) {
        response.status(403).json({ message: 'Not allowed to edit' });
    }
    let document = db.collection('classes').doc(`${request.params.classId}`);
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