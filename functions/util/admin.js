const admin = require('firebase-admin');

var serviceAccount = require('../../my-planner426-firebase-adminsdk-btqdy-ccdbbcbb7f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };