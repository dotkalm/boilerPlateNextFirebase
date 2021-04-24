import { getDoc, mintToken } from './firebaseNode'
import { makeQueryString } from '../shared/utils/queryString'
import crypto from 'crypto' 
import timingSafeCompare from 'tsscmp'

export const verifyHmac = shopData => {
	const sansHmac = new Object

	for(const key in shopData){
		if(key != 'hmac'){
			sansHmac[key] = shopData[key]
		}
	}

	const keys = Object.keys(sansHmac).push('state').sort() 

	const nonce = crypto.randomBytes(16).toString('base64') 
	shopData['state'] = nonce

	const newArray = new Array(keys.length).fill({key: null, value: null})
	for(let i = 0; i < newArray.length; i++){
		const key = keys[i] 
		newArray[i].key = key 
		newArray[i].value = shopData[key] 
	}
	const qS = makeQueryString(newArray)
	console.log(qS, 24)
	const hmac = crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
		.digest("hex")
	console.log(hmac, shopData.hmac, nonce, 29)
	const good = timingSafeCompare(hmac, shopData.hmac)
	console.log(good, 28)
	return good
}

export const redirect = async merchant => {
	console.log('merchant already signed installed app')
}

export const checkShop = async (parent, args, request) => {
	const { shop } = args
	const { name, timestamp, hmac } = shop 
	const merchant = await getDoc('merchants', name)
	if(merchant && merchant.error){
		const authenticatedMerchant = await verifyHmac(shop)
		console.log(authenticatedMerchant, 42)
		return authenticatedMerchant
	}else{
		return merchant 
	}
}
