const { db } = require('../util/admin');

exports.getAllEvents = (request, response) => {
	db
		.collection('events')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let events = [];
			data.forEach((doc) => {
				events.push({
                    todoId: doc.id,
                    title: doc.data().title,
					body: doc.data().body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(events);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};