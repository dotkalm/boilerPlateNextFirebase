import prepareArgs from './utils/prepareArgs'
import { getDoc } from '../actions/firebase'
import { makeMutation } from '../graphql/client'
import { demoQuery, demoHeader } from './const'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
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
	}else{
			return rr
		}
}
export const openShop = async ({ 
	query, 
	pathname, 
	asPath,
	isFallback,
	basePath,
	locale,
	locales,
	defaultLocale,
	isReady,
	isPreview
}) => {
if(query != null){
		if(Object.keys(query).length > 0){
			const { hmac, shop, timestamp } = query
			const obj = { type: 'shop', params: query }
			return shopifyServer(obj)
		}
	}
}

