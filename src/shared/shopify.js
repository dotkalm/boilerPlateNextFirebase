import prepareArgs from './utils/prepareArgs'
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
		if(
			window 
			&& window.location 
			&& window.location.origin === process.env.GRAPHQL_LOCAL_SERVER
		){
			backendUrl = process.env.GRAPHQL_LOCAL_SERVER
		}
		const idToken = params.hmac 
		const request = getRequest(idToken, demoQuery)
		console.log(demoQuery)
		const f = await fetch(`${backendUrl}/api/graphql`, request)
		const rr = await f.json()
		console.log(rr, 25)
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

