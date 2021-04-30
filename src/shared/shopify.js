import prepareArgs from './utils/prepareArgs'
import { makeMutation, requestJwt } from '../graphql/client'
import { getRequest } from '../actions/request'
import { validateHmac } from '../graphql/client'
import Router from 'next/router'

export const beginSession = async params => {
	try{
		console.log(params)
		const store = requestJwt(params)
		const request = getRequest(params.jwt || null, store)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = await f.json()
		return rr
	}catch(err){
		console.log(err)
		return err
	}
}

export const shopifyServer = async ({ type, params }) => {
	try{
		const args = prepareArgs(params)
		if(args != ' ' && params.hmac){
			const mutation = makeMutation(params)
			const request = getRequest(null, mutation)
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
			const { data } = response
			if(data && data.addStore){
				const { name } = data.addStore
				return { name }
			}
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
export const checkMerchant = async query => {
	try{
		const gql = validateHmac(query)
		const request = getRequest(null, gql)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = f.json()
		return rr
	}catch(err){
		console.log(err)
		return err
	}
}
export const openShop = async query => {
	try{
		if(query.hmac && !query.session){
			console.log(query)
			const d = await checkMerchant(query)
			if(d && d.data){
				const { data } = d
				if(data && data.ValidateHmac && data.ValidateHmac !== undefined){
					const { valid, installed, redirectUrl } = data.ValidateHmac
					return { valid, installed, redirectUrl }
				}
			}
		}
		if(query.hmac && query.session){
			const response = await beginSession(query)
			if(response && response.data && response.data.requestJwt){
				return response.data.requestJwt
			}
		}
	}catch(err){
		console.log(err)
	}
}

