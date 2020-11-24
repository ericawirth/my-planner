const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

module.exports = { admin, db };

//var serviceAccount = require('../../my-planner426-firebase-adminsdk-btqdy-ccdbbcbb7f.json');
//{credential: admin.credential.cert(serviceAccount)}