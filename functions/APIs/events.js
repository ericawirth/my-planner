const { db } = require('../util/admin');

exports.getAllEvents = (request, response) => {
    db
        .collection('events')
        .where('email', '==', request.user.email)
        .get()
        .then((data) => {
            let events = [];
            data.forEach((doc) => {
                console.log(doc);
                events.push({
                    eventId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                });
            });
            return response.json(events);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.getOneEvent = (request, response) => {
	db
        .doc(`/events/${request.params.eventId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json(
                    { 
                        error: 'Event not found' 
                    });
            }
            if(doc.data().email !== request.user.email){
                return response.status(403).json({error:"UnAuthorized"})
            }
			let EventData = doc.data();
			EventData.eventId = doc.id;
			return response.json(EventData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
};

exports.postOneEvent = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if (request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }

    const newEventItem = {
        title: request.body.title,
        email: request.user.email,
        body: request.body.body,
        createdAt: new Date().toISOString()
    }
    db
        .collection('events')
        .add(newEventItem)
        .then((doc) => {
            const responseEventItem = newEventItem;
            responseEventItem.id = doc.id;
            return response.json(responseEventItem);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Something went wrong' });
            console.error(err);
        });
};

exports.deleteEvent = (request, response) => {
    const document = db.doc(`/events/${request.params.eventId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({
                    error: 'Event not found'
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

exports.editEvent = (request, response) => {
    if (request.body.eventId || request.body.createdAt) {
        response.status(403).json({ message: 'Not allowed to edit' });
    }
    let document = db.collection('events').doc(`${request.params.eventId}`);
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