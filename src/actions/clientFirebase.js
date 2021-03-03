import getFirebase from 'client/firebase'
const firebase = getFirebase()

export const getSnapshot = async (collectionName, docUid) => {
	return firebase.db.collection(collectionName).doc(docUid)
	.onSnapshot(doc => {
		console.log(doc.data())
		return doc.data()
	})
}
export const getDoc = async (collectionName, docUid) => {
	return firebase.db.collection(collectionName).doc(docUid)
	.get()
	.then(doc => {
		if(doc.exists){
			return {...doc.data(), uid: doc.id}
		}else{
			return 'not here'
		}
	})
}
