import prepareArgs from './utils/prepareArgs'
import { defaultOptions, queryParams, getRequest } from '../actions/request'
let backendUrl = process.env.GRAPHQL_SERVER

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
}

export const shopifyServer = async ({ type, params }) => {
	const args = prepareArgs(params)
	if(args != ' '){
		const queryString = `mutation{
			addStore(
				shop : {
					hmac:
						"cb80706e0e80325fc7218e3f4bed60aadf237f3dae7bd2afd1492d8da9bfa756"
					shop:
						"thingsinmycartry.myshopify.com"
					timestamp:
						"1618966768"
				}
			)
			{
				Shop{
					name
				}
			}
		}
		`

		console.log(queryString)
		if(
			window 
			&& window.location 
			&& window.location.origin === process.env.GRAPHQL_LOCAL_SERVER
		){
			backendUrl = process.env.GRAPHQL_LOCAL_SERVER
		}
		const idToken = params.hmac 
		const request = getRequest(idToken, queryString)
		const f = await fetch(`${backendUrl}/api/graphql`, request)
		const rr = await f.json()
		console.log(rr, 30)
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

