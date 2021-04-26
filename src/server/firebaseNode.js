import * as admin from 'firebase-admin'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			type: process.env.FIREBASE_TYPE,
			project_id: process.env.FIREBASE_PROJECT_ID,
			private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
			private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
			client_id: process.env.FIREBASE_CLIENT_ID,
			auth_uri: process.env.FIREBASE_AUTH_URI,
			token_uri: process.env.FIREBASE_TOKEN_URI,
			auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
			client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
		}), 
		databaseURL: process.env.CLIENT_DATABASE_URL,
		storageBucket: process.env.CLIENT_STORAGE_BUCKET,
	});
}

export const getCollection = async (collectionName, queryArray)  => {
	const db = admin.firestore()
	let collectionReference = db.collection(collectionName)
	if(queryArray){
		for(let i=0; i < queryArray.length; i++){
			const { field, opperator, value, sort } = queryArray[i]
			if(!sort){
				collectionReference = collectionReference.where(field, opperator, value)
			}else{
				collectionReference = collectionReference.orderBy(field, sort)
			}
		}
	}
	return collectionReference.get()
	.then(querySnapshot => {
		return Promise.all(querySnapshot.docs
			.map(e => ({...e.data(), uid : e.id}))
		)
	})
}
export const setDoc = async (collectionName, obj, uid) => {
	try{
		const db = admin.firestore()
		return db.collection(collectionName).doc(uid).set(obj)
			.then(() => 'SUCCESS')
	}catch(err){
		console.log(err)
		return err
	}
}

export const getDoc = async (collectionName, uid) => {
	const db = admin.firestore()
	const doc = await db.collection(collectionName).doc(uid).get()
	if (!doc.exists) {
		return { error: true, message: 'not here' } 
	} else {
		const data = doc.data()
		data.uid = uid 
		return data
	}
}

export const nextElement = async (collection, currentId) => {
	return new Promise(resolve => {
		const db = admin.firestore()
		const nextElement = db.collection(collection)
		.orderBy('uid')
		.startAfter(currentId)
		.limit(1)
		return nextElement.get().then(results => {
			if (results.empty) {
				const firstElement = db.collection(collection)
				.orderBy('uid')
				.limit(1)
				return firstElement.get().then(results => {
					results.forEach(doc => {
						resolve(doc.data())
					})
				})
			}else{
				results.forEach(doc => {
					resolve(doc.data())
				})
			}
		})
	})
}

export const getLogin = async idToken => {
	return admin.auth().verifyIdToken(idToken, true)
	.catch(err => console.log(devTimestamp, err, 'line 913'))
}

export const mintToken = async => {
	return admin.auth().createCustomToken(hmac)
}
