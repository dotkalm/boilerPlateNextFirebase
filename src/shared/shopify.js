import prepareArgs from './utils/prepareArgs'
import { getDoc } from '../actions/firebase'
import { makeMutation } from '../graphql/client'
import { demoQuery, demoHeader } from './const'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
import Router from 'next/router'
let backendUrl = process.env.GRAPHQL_SERVER

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
}

export const shopifyServer = async ({ type, params }) => {
	const args = prepareArgs(params)
	if(args != ' '){
		const idToken = params.hmac 
		const mutation = makeMutation(params)
		const request = getRequest(null, mutation)
		const f = await fetch(`${backendUrl}/api/graphql`, request)
		const rr = await f.json()
		return rr
	}
}
export const openShop = async () => {
	const { router } = Router
	const { query } = router
	if(query != null){
		if(Object.keys(query).length > 0){
			const obj = { type: 'shop', params: query }
			const response = await shopifyServer(obj)
			if(response && response.data && response.data.addStore){
				console.log(response.data.addStore, router.query)
				const { redirectURL, name } = response.data.addStore
				return Router.push(redirectURL) 
			}
		}
	}
}

