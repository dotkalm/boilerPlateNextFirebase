const shopifyApiKey = process.env.SHOPIFY_API_KEY
const shopifySecretKey = process.env.SHOPIFY_API_SECRET

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
}

export const openShop = query => {
	if(query != null){
		console.log(query, `\n line 17, X-Shopify-Hmac-SHA256 `)
	}else{
		return null
	}
}

