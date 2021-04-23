import getFirebase from '../shared/firebaseClient'
const firebase = getFirebase()

export const setDoc = async (collectionName, obj, uid) => {
	return firebase.db.collection(collectionName).doc(uid).set(obj)
	.then(() => 'success')
	.catch(err => err)
}

export const getDoc = async (collectionName, uid) => {
	const doc = await firebase.db.collection(collectionName).doc(uid).get(obj)
	if (!doc.exists) {
		return null
	} else {
		return doc.data()
	}
}

