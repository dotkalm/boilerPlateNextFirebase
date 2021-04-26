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

	
	const newArray = new Array(keys.length).fill({key: null, value: null})
	for(let i = 0; i < keys.length; i++){
		const key = keys[i] 
		if(key === 'state'){
			newArray[i] = { key: keys[i], value: nonce }
		}else{
			newArray[i] = { key: keys[i], value: shopData[keys[i]] }
		}
	}
	const qS = makeQueryString(newArray)
	console.log(newArray, 31)
	const hmac = Buffer.from(crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
		.update(qS)
		.digest("hex"), 'utf-8')
	const providedHmac = Buffer.from(shopData.hmac, 'utf-8')
	console.log(hmac, '<------ NEW HMAC', 39)
	console.log(providedHmac)
	const good = timingSafeCompare(hmac, providedHmac)
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
		const nonce = crypto.randomBytes(16).toString('base64') 
		const redirectURL = `https://${name}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPES}&redirect_uri=${process.env.SHOPIFY_APP_URL}/auth/callback&state=${nonce}`
		return { redirectURL }
	}else{
		return merchant 
	}
}
