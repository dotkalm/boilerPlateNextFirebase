import getFirebase from '../shared/firebaseClient'
const firebase = getFirebase()

export const setDoc = async (collectionName, obj, uid) => {
	return firebase.db.collection(collectionName).doc(uid).set(obj)
	.then(() => 'success')
	.catch(err => err)
}

