import Router from 'next/router'
import getFirebase from '../shared/firebaseClient'
import { getRequest } from './request'
const firebase = getFirebase()

export const getIdToken = () => firebase && firebase.auth.currentUser !== null && firebase.auth.currentUser.getIdToken(true)
const getIdTokenResult = () => firebase && firebase.auth.currentUser !== null && firebase.auth.currentUser
	.getIdTokenResult()
	.catch(err => {
		console.log(err)
		return err
	})

export const signInWithCustomClaim = async jwt => {
	return firebase.auth.signInWithCustomToken(jwt).then(user => {
		console.log(user)
		return user
	})
}
export const checkLogged = new Promise((resolve, reject) => { 
	const handleAuthStateChanged = async () => {
		try{
			const user = await getIdTokenResult() 
			if(user && user.uid){
				const { uid, name } = user
				const obj = { uid, name }
				resolve(obj)
			}else{
				throw new Error('NOT AUTHORIZED')
			}
		}catch(err){
			console.log(err)
			return err
		}
	}
	if(firebase){
		firebase.auth.onAuthStateChanged(handleAuthStateChanged)
	}
})

