const shopifyApiKey = process.env.SHOPIFY_API_KEY
const shopifySecretKey = process.env.SHOPIFY_API_SECRET

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	return hmac
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
		console.log(Object.keys(query))
		if(Object.keys(query).length > 0){
			return query
		}
	}
}

