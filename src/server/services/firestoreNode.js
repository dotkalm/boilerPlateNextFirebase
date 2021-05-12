import admin from 'firebase-admin'
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			type: process.env.FIREBASE_TYPE,
			project_id: process.env.FIREBASE_PROJECT_ID,
			private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
			private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
			client_id: process.env.FIREBASE_CLIENT_ID,
		}),
	})
}else{
	admin.app()
}
const db = admin.firestore()

export const getDoc = async (collectionName, docUid) => {
	return db.collection(collectionName).doc(docUid)
	.get()
	.then(doc => {
		if(doc.exists){
			return {...doc.data(), uid: doc.id}
		}else{
			return 'not here'
		}
	})
}
export const addDoc = async (collectionName, obj) => {
	return db.collection(collectionName).add(obj)
	.then(doc => doc.id)
	.catch(err => err)
}
export const setDoc = async (collectionName, obj, uid) => {
	return db.collection(collectionName).doc(uid).set(obj)
	.then(() => 'success')
	.catch(err => err)
}
export const getCollection = async (collectionName, queryArray)  => {
	let collectionReference = db.collection(collectionName)
	if(queryArray){
		for(let i=0; i < queryArray.length; i++){
			const [ field, opperator, value ] = queryArray[i]
			if(field === 'limit' && !opperator){
				collectionReference = collectionReference.limit(value)
			}else{
				collectionReference = collectionReference.where(field, opperator, value)
			}
		}
	}
	return collectionReference.get()
	.then(querySnapshot => {
		return Promise.all(querySnapshot.docs
			.map(e => ({...e.data(), uid: e.id}))
		)
	})
	.catch(err => {
		console.log(err, 65)
		return err
	})
}
export const updateDoc = async (collectionName, obj, uid) => {
	return db.collection(collectionName).doc(uid).update(obj)
	.then(() => 'success')
	.catch(err => err)
}
export const deleteField = async (uid, fields, collectionName) => {
	const obj = {}
	for(let i = 0; i < fields.length; i++){
		obj[fields[i]] = admin.firestore.FieldValue.delete()
	}
	return db.collection(collectionName).doc(uid).update(obj)
	.then(() => 'success')
	.catch(err => err)
}
export const deleteDoc = async (collectionName, uid) => {
	return db.collection(collectionName).doc(uid).delete()
	.then(() => 'success')
	.catch(err => err)
}

