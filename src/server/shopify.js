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
	console.log(sansHmac, 14)
	
	const unsortedKeys = Object.keys(sansHmac)
	console.log(unsortedKeys)
	unsortedKeys.push('state')

	const keys = unsortedKeys.sort()
	console.log(keys, 21)

	const nonce = crypto.randomBytes(16).toString('base64') 
	shopData['state'] = nonce
	
	const newArray = new Array(keys.length).fill({key: null, value: null})
	for(let i = 0; i < keys.length; i++){
		const key = keys[i] 
		newArray[i] = { key: keys[i], value: shopData[keys[i]] }
	}
	console.log(newArray, 31)
	const qS = makeQueryString(newArray)
	const hmac = crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
		.digest("hex")
	console.log(hmac, '\n', shopData.hmac, 35)
	const good = timingSafeCompare(hmac, shopData.hmac)
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
		console.log(shop)
		const authenticatedMerchant = await verifyHmac(shop)
		console.log(authenticatedMerchant, 42)
		return authenticatedMerchant
	}else{
		return merchant 
	}
}
