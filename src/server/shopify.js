import { getDoc, mintToken, setDoc } from './firebaseNode'
import { makeQueryString } from '../shared/utils/queryString'
import { shopRegex, httpsRegex } from '../shared/utils/shopifyValidation'
import crypto from 'crypto' 
import timingSafeCompare from 'tsscmp'

export const verifyHmac = shopData => {
	const sansHmac = new Object

	for(const key in shopData){
		if(key != 'hmac'){
			sansHmac[key] = shopData[key]
		}
	}
	
	const unsortedKeys = Object.keys(sansHmac)
	unsortedKeys.push('state')
	const keys = unsortedKeys.sort()

	
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
	const hmac = Buffer.from(crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
		.update(qS)
		.digest("hex"), 'utf-8')
	const providedHmac = Buffer.from(shopData.hmac, 'utf-8')
	console.log(hmac, '<------ NEW HMAC', 39)
	console.log(providedHmac)
	const good = timingSafeCompare(hmac, providedHmac)
	return good
}

export const oAuthExchange = async (shop, request) => {
		const { name } = shop 
		const merchant = await getDoc('merchants', name)
		return { name : 'NO' }
}
export const checkShop = async (parent, shop, request) => {
	const { name, timestamp, hmac } = shop 
	const merchant = await getDoc('merchants', name)
	if(merchant && merchant.error){
		const nonce = crypto.randomBytes(16).toString('base64') 
		const redirectURL = `https://${name}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPES}&redirect_uri=${process.env.SHOPIFY_APP_URL}/auth/callback&state=${nonce}`
		const data = { state: nonce, installedAt: timestamp, hmac, name, redirectURL }
		const success = await setDoc('merchants', data, name)
		if(success === 'SUCCESS'){
			return { redirectURL }
		}
	}else if(merchant && !merchant.error){
		const { referer } =  request.header
		console.log(merchant, args.shop, referer, 57)
		return merchant 
	}
}
