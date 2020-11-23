const admin = require('firebase-admin');

var serviceAccount = require("D:Dev/426Firebase/my-planner426-firebase-adminsdk-btqdy-ccdbbcbb7f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-planner426.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };