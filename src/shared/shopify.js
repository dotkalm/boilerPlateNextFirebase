import prepareArgs from './utils/prepareArgs'
import { getDoc } from '../actions/firebase'
import { makeMutation } from '../graphql/client'
import { demoQuery, demoHeader } from './const'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
import { signInWithCustomToken } from '../actions/auth'
import Router from 'next/router'
let backendUrl = process.env.GRAPHQL_SERVER

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
}

export const shopifyServer = async ({ type, params }) => {
	try{
		const args = prepareArgs(params)
		if(args != ' '){
			const idToken = params.hmac 
			const mutation = makeMutation(params)
			console.log(mutation)
			const request = getRequest(null, mutation)
			console.log(request)
			const f = await fetch(`${backendUrl}/api/graphql`, request)
			const rr = await f.json()
			return rr
		}
	}catch(err){
		console.log(err)
		return err
	}
}
export const openShop = async () => {
	try{
		const { router } = Router
		if(router != null){
			const { query } = router
			if(query != null){
				if(Object.keys(query).length > 0){
					const obj = { type: 'shop', params: query }
					const response = await shopifyServer(obj)
					if(response && response.data && response.data.addStore){
						const { redirectURL } = response.data.addStore
						if(!redirectURL){
							const oo = response.data.addStore
							console.log(oo, 42)
							const { jwt, name, uid } = oo	
							const user = await signInWithCustomToken(jwt)
							console.log(user, 49)
							return Router.push(`/`)
						}else{
							console.log({ redirectURL, name })
							return Router.push(redirectURL) 
						}
					}
				}
			}
		}
	}catch(err){
		console.log(err, 35)
		return err
	}
}

