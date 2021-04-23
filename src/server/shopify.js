const { parseUrl } = require('url')

export const openShop = ({ url, hostname, body }) => {
	const params = parseUrl(url)
	if(params != null){
		const hmac = params.get("hmac")
		const shop = params.get("shop")
		const timestamp = params.get("timestamp")
		const obj = { hmac, shop, timestamp }
		console.log(obj, `\n line 10`)
		return shop
	}else{
		return null
	}
}

export const checkShop = async (parent, args, request) => {
	console.log(request.headers,'\n', args, '\n', request.body.query,'\n',18)
	return args 
}
