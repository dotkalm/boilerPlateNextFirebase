import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/functions'

const config = {
	apiKey: process.env.CLIENT_APIKEY,
	authDomain: process.env.CLIENT_AUTH_DOMAIN,
	databaseURL:process.env.CLIENT_DATABASE_URL,
	projectId: process.env.CLIENT_PROJECT_ID,
	storageBucket: process.env.CLIENT_STORAGE_BUCKET,
	messagingSenderId: process.env.CLIENT_MESSAGING_SENDER_ID,
	appId: process.env.CLIENT_APP_ID,
}

let instance

export default function getFirebase () {
	if (typeof window !== 'undefined') {
		if (instance) {
			return instance
		}
		instance = firebase.initializeApp(config)
		instance.auth = firebase.auth()
		instance.storage = firebase.storage()
		instance.functions = firebase.functions()
		instance.googleProvider = new firebase.auth.GoogleAuthProvider()
		instance.twitterProvider = new firebase.auth.TwitterAuthProvider()
		instance.facebookProvider = new firebase.auth.FacebookAuthProvider()
		instance.db = firebase.firestore()
		return instance
	}

	return null
}

