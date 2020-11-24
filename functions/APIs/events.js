const { db } = require('../util/admin');
const cors = require('cors')({origin: true});
var axios = require('axios');

exports.getAllEvents = (request, response) => {
    db.collection('events')
        .where('email', '==', request.user.email)
        .get()
        .then((data) => {
            let events = [];
            data.forEach((doc) => {
                console.log(doc);
                events.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            return response.json(events);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.getHolidayEvent = (request, response) => {
    cors(request, response, () => {
        axios.get('https://calendarific.com/api/v2/holidays?&api_key=e97c3980b6041c03093289f6c5aab17271bc361c&country=US&year=2020&type=national')
        .then(r => {
          return response.send(r.data);
        })
        .catch( e => {
          return response.sendStatus(e);
        })
      })
};


exports.getOneEvent = (request, response) => {
    db.doc(`/events/${request.params.eventId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json(
                    {
                        error: 'Event not found'
                    });
            }
            if (doc.data().email !== request.user.email) {
                return response.status(403).json({ error: "UnAuthorized" })
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

    const newEventItem = {
        subject: request.body.subject,
        email: request.user.email,
        title: request.body.title,
        start: request.body.start,
        time: request.body.time,
        completed: request.body.completed,
        body: request.body.body,
        eventType: request.body.eventType,
        classDetails: request.body.classDetails,
        end: request.body.end,
        allDay: request.body.allDay,
        createdAt: new Date().toISOString()
    }
    db.collection('events')
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