import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCIvQcYku5ayp7DNlQukqCHTQqRyYaU-ok',
	authDomain: 'facebook-d7ceb.firebaseapp.com',
	projectId: 'facebook-d7ceb',
	storageBucket: 'facebook-d7ceb.appspot.com',
	messagingSenderId: '556320105853',
	appId: '1:556320105853:web:f9688e1cf005d5f018d814',
	measurementId: 'G-JEW2WEPML7',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider, storage };
