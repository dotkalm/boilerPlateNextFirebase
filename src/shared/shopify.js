import prepareArgs from './utils/prepareArgs'
import { makeMutation, getStore } from '../graphql/client'
import { demoQuery, demoHeader } from './const'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
import { checkMerchant } from '../actions/auth'
import Router from 'next/router'

export const exchangeSessionToken = async params => {
	try{
		console.log(params)
		const { session } = params 
		const store = getStore(params)
		const request = getRequest(`Bearer ${session}`, store)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = await f.json()
		return rr
	}catch(err){
		console.log(err)
		return err
	}
}
export const shopifyServer = async ({ type, params, token }) => {
	try{
		const args = prepareArgs(params)
		if(args != ' ' && params.hmac){
			const mutation = makeMutation(params)
			console.log(mutation)
			const request = getRequest(token, mutation)
			const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
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
			const oo = response
			console.log(oo)
			return oo
		}
	}catch(err){
		console.log(err)
		return err
	}
}
export const addMerchant = async params => {
	const obj = { type: 'shop', params, token: null }
	const response = await shopifyServer(obj)
	console.log(response, 66)
	if(response && response.data && response.data.addStore){
		const { addStore } = response.data
		const { redirectURL } = addStore
		console.log(response.data)
		return redirectURL
	}
}
export const openShop = async query => {
	try{
		if(query.hmac){
			console.log(query)
			const d = await checkMerchant(query)
			console.log(d)
			if(d !== undefined){
				const { data } = d
				if(data && data.ValidateHmac && data.ValidateHmac !== undefined){
					const { valid, installed } = data.ValidateHmac
					return { valid, installed }
				}
			}
		}
	}catch(err){
		console.log(err)
	}
}

