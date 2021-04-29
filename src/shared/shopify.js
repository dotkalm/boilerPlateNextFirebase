import prepareArgs from './utils/prepareArgs'
import { getDoc } from '../actions/firebase'
import { makeMutation, getStore } from '../graphql/client'
import { demoQuery, demoHeader } from './const'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
import { checkMerchant } from '../actions/auth'
import Router from 'next/router'

export const exchangeSessionToken = async params => {
	try{
		const { session } = params 
		console.log(params)
		const store = getStore(params)
		const request = getRequest(session, store)
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
			const oo = response.data.addStore
			const { jwt, name, uid } = oo	
			return uid 
		}
	}catch(err){
		console.log(err)
		return err
	}
}
export const addMerchant = async params => {
	const obj = { type: 'shop', params, token: null }
	const response = await shopifyServer(obj)
	if(response){
		if(response.data && response.data.addStore){
			const { addStore } = response.data
			const { redirectURL } = addStore
			return redirectURL
		}
	}
}
export const openShop = async query => {
	try{
		const q = await routerQuery
		console.log(q)
		const current = await checkMerchant
		if(!current){
			return addMerchant(query)
		}else{
			return current
		}
	}catch(err){
		console.log(err, 35)
		return addMerchant(query)
	}
}

