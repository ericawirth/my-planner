// Important firebase-admin package and initialize the firestore database object

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

module.exports = { admin, db };