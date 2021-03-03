import getFirebase from '../shared/firebaseClient'
import Router from 'next/router'

const firebase = getFirebase()

export const getIdToken = () => firebase && firebase.auth.currentUser !== null && firebase.auth.currentUser.getIdToken(true)
export const getIdTokenResult = () => firebase && firebase.auth.currentUser !== null && firebase.auth.currentUser
	.getIdTokenResult()
	.then(idTokenResult => {
		console.log(idTokenResult)
		if(!idTokenResult.claims.admin){
			return !idTokenResult.claims.guest ? false : idTokenResult 
		}else{
			return idTokenResult 
		}
	})
	.catch(err => {
		console.log(err)
		return err
	})

export const loginWithGoogle = () => {
	firebase.googleProvider
		.addScope('email')
		.addScope('https://mail.google.com')
		.addScope('https://www.googleapis.com/auth/spreadsheets')
		.addScope('https://www.googleapis.com/auth/cloud-platform')
		.addScope('https://www.googleapis.com/auth/devstorage.full_control')
	
	return firebase.auth.signInWithPopup(firebase.googleProvider)
}
export const loginWithTwitter = () => {
	return firebase.auth.signInWithPopup(firebase.twitterProvider)
}
export const getGmail = async string => {
	const sendToFlask = async () => {
		const token = await firebase.auth.currentUser.getIdToken(true)
		const isAdmin = await firebase.auth.currentUser.getIdTokenResult()
		const data = new FormData();
		try {
			const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/gmail/`
			const obj = {
				method: 'POST',
				credentials: 'include',
				body: data,
				headers: {
					'enctype': 'multipart/form-data',
					'Authorization': token,
				}
			}
			const registerResponse = await fetch(url, obj)
			const parsedResponse = await registerResponse.json()
			return parsedResponse
		}catch(err){
			console.log(err, 54)
			return err
		}
	}
	const levels = await sendToFlask()
}
export const login = async provider => {
	let auth 
	if(provider === 'g'){
		auth = await loginWithGoogle()
	}
	if(provider === 't'){
		auth = await loginWithTwitter()
	}
	if(auth){
		const result = await getIdTokenResult()
		if(result.claims.admin){
			Router.push('/upload')
		}else{
			return result
		}
	}
	return auth 
}
export const logOut = () => {
	return firebase.auth.signOut()
}
export const signIn = auth => {
	getIdToken()
	.then(idToken => {
		return idToken
	})
}

export const checkLogged = new Promise((resolve, reject) => { 
	const handleAuthStateChanged = async user => {
		const token = await getIdToken()
		const isAdmin = await getIdTokenResult() 
		if(user && user.uid){
			const obj = { uid: user.uid, token, user: isAdmin, isAdmin: isAdmin !== false ? true : false }
			return resolve(obj)
		}else{
			return reject("NOT AUTHORIZED")
		}
	}
	if(firebase){
		return firebase.auth.onAuthStateChanged(handleAuthStateChanged)
	}
})

export const emailLogin = async (email, password) => {
	try {
		const auth = await firebase.auth
			.signInWithEmailAndPassword(email, password)
			.catch(err => {
				return { ...err, error: true }
			})
		console.log(auth)
		if(auth){
			auth.additionalUserInfo['profile'] = { email }
			const result = await getIdTokenResult()
			console.log(result)
			if(result.claims.admin){
				Router.push('/upload')
			}else if(result.claims.guest){
				Router.push('/tiger')
			}else{
				return auth
			}
		}
	} catch(err){
		return { ...err, error: true }
	}
}
