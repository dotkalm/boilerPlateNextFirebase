import { parseUrl } from '../actions/url'
const shopifyApiKey = process.env.SHOPIFY_API_KEY
const shopifySecretKey = process.env.SHOPIFY_API_SECRET

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
}

export const openShop = ({ url, hostname, body })=> {
	const params = parseUrl(url)
	if(params != null){
		const hmac = params.get("hmac")
		const shop = params.get("shop")
		const timestamp = params.get("timestamp")
		const obj = { hmac, shop, timestamp }
		console.log(obj, `\n line 17`)
		return makeToken(obj)
	}else{
		return null
	}
}

