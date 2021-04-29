import prepareArgs from './utils/prepareArgs'
import { getDoc } from '../actions/firebase'
import { makeMutation } from '../graphql/client'
import { demoQuery, demoHeader } from './const'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
import { signInWithCustomToken, getIdTokenResult, checkLogged } from '../actions/auth'
import Router from 'next/router'
let backendUrl = process.env.GRAPHQL_SERVER

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
}
export const exchangeSessionToken = async sessionToken => {
}
export const shopifyServer = async ({ type, params, token }) => {
	try{
		const args = prepareArgs(params)
		if(args != ' ' && params.hmac){
			const mutation = makeMutation(params)
			const request = getRequest(token, mutation)
			const f = await fetch(`${backendUrl}/api/graphql`, request)
			const rr = await f.json()
			return rr
		}
	}catch(err){
		console.log(err)
		return err
	}
}
export const routerQuery = new Promise((res, rej) => {
	const { router } = Router
	if(router != null){
		const { query } = router
		if(query != null){
			if(Object.keys(query).length > 0){
				res(query)
			}
		}
	}
}) 
export const oAuthCallback = async query => {
	try{
		const obj = { type: 'shop', params: query }
		const response = await shopifyServer(obj)
		if(response !== undefined){
			const oo = response.data.addStore
			const { jwt, name, uid } = oo	
			const user = await signInWithCustomToken(jwt)
			const shop = await getIdTokenResult()
			console.log({ user, shop })
			return { user, shop } 
		}
	}catch(err){
		console.log(err)
		return err
	}
}
export const unlockDoor = async params => {
	const obj = { type: 'shop', params, token: null }
	const response = await shopifyServer(obj)
	if(response){
		console.log(response.data)
		if(response.data && response.data.addStore){
			const { addStore } = response.data
			const { redirectURL } = addStore
			return redirectURL
		}
	}
}
export const openShop = async query => {
	try{
		const current = await checkLogged
		console.log(current)
		if(!current){
			return unlockDoor(query)
		}else{
			const shop = await getIdTokenResult()
			console.log(shop)
			return shop
		}
	}catch(err){
		console.log(err, 35)
		return unlockDoor(query)
	}
}

