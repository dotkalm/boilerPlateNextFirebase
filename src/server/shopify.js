import { parseUrl } from 'url'
import { getDoc } from './firebaseNode'

export const install = async shop => {
	const { name, timestamp, hmac } = shop 
}

export const openShop = ({ url, hostname, body }) => {
	const params = parseUrl(url)
	if(params != null){
		const hmac = params.get("hmac")
		const shop = params.get("shop")
		const timestamp = params.get("timestamp")
		const obj = { hmac, shop, timestamp }
		console.log(obj, `\n^^^^^^^^^ line 11 ^^^^^^^^^`)
		return shop
	}else{
		return null
	}
}
export const redirect = async merchant => {
	console.log('merchant already signed installed app')
}

export const checkShop = async (parent, args, request) => {
	const { shop } = args
	const { name, timestamp, hmac } = shop 
	const merchant = await getDoc('merchants', name)
	return merchant 
}
