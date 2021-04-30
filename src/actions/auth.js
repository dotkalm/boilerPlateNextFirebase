import Router from 'next/router'
import getFirebase from '../shared/firebaseClient'
import { validateHmac } from '../graphql/client'
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
export const handleAuthStateChanged = async (res, rej) => {
	const user = await getIdTokenResult() 
	if(user && user.uid){
		const { uid, name } = user
		const obj = { uid, name }
		res(obj)
	}else{
		rej("NOT AUTHORIZED")
	}
}
export const checkLogged = new Promise((resolve, reject) => { 
	if(firebase){
		firebase.auth.onAuthStateChanged(handleAuthStateChanged(resolve, reject))
	}
})

export const checkMerchant = async ({ name, shop, timestamp, hmac }) => {
	try{
		const query = {
			shop,
			timestamp,
			hmac
		}
		const gql = validateHmac(query)
		console.log(gql)
		const request = getRequest(null, gql)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = f.json()
		return rr
	}catch(err){
		console.log(err)
		return err
	}
}
