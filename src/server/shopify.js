import { parseUrl } from 'url'
import { getDoc } from './firebaseNode'

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

export const checkShop = async (parent, args, request) => {
	const { name, timestamp, hmac } = args
	console.log(args, 20)
	const exists = await getDoc('merchants', name)
	print(exists)
}
