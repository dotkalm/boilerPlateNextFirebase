import Shopify, { ApiVersion } from "@shopify/shopify-api";
import { Auth } from "shopify-admin-api"
import { parseUrl } from '../actions/url'
const shopifyApiKey = process.env.SHOPIFY_API_KEY
const shopifySecretKey = process.env.SHOPIFY_API_SECRET

const makeToken = async obj => {
	const { hmac, shop, timestamp } = obj 
	console.log(obj, 8)
	const isValidUrl = await Auth.isValidMyShopifyDomain(shop)
	console.log(isValidUrl, 10)
	const accessToken = await Auth.authorize(hmac, shop, shopifyApiKey, shopifySecretKey)
	console.log(accessToken, 10)
	return accessToken
}

export const openShop = url => {
	const params = parseUrl(url)
	if(params != null){
		const hmac = params.get("hmac")
		const shop = params.get("shop")
		const timestamp = params.get("timestamp")
		const obj = { hmac, shop, timestamp }
		return makeToken(obj)
	}else{
		return null
	}
}

