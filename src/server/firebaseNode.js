import * as admin from 'firebase-admin'
import serviceAccount from '../../serviceAccount'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount), 
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
	const db = admin.firestore()
	return db.collection(collectionName).doc(uid).set(obj, err => {
		if(err){
			return err
		} else {
			return 'success'
		}
	})
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

