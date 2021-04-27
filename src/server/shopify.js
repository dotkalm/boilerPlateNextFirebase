import crypto from 'crypto' 
import timingSafeCompare from 'tsscmp'

import { getDoc, mintToken, setDoc } from './firebaseNode'
import { makeQueryString } from '../shared/utils/queryString'
import { shopRegex, httpsRegex } from '../shared/utils/shopifyValidation'
import { oAuthRequest } from './oAuth'

export const verifyHmac = shopData => {

	const { name } = shopData
	console.log(shopData, 12)
	const sansHmac = { ...shopData }  
	delete sansHmac['hmac']
	delete sansHmac['name']
	sansHmac['shop'] = name

	const unsortedKeys = Object.keys(sansHmac)
	const keys = unsortedKeys.sort()
	const newArray = new Array(keys.length).fill({key: null, value: null})
	for(let i = 0; i < keys.length; i++){
		const key = keys[i] 
		newArray[i] = { key: keys[i], value: sansHmac[key] }
	}
	const qS = makeQueryString(newArray)
	console.log(qS, newArray)
	const hmac = Buffer.from(crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
		.update(qS)
		.digest("hex"), 'utf-8')
	const providedHmac = Buffer.from(shopData.hmac, 'utf-8')
	const truth = timingSafeCompare(hmac, providedHmac)
	console.log(hmac.toString(),'<------ NEW HMAC')
	console.log(providedHmac.toString(), '<------ PROVIDED HMAC', truth)
	return truth
}

export const oAuthExchange = async (shop, request) => {
	try{
		const merchant = await getDoc('merchants', shop.name)
		if(merchant && merchant.error){
			throw new Error(merchant.error)
		}else{
			if(merchant && merchant.state){
				const compareNonce = timingSafeCompare(merchant.state, shop.state)
				if(!compareNonce){
					console.log(merchant.state, shop.state)
					throw new Error('nonce mismatch')
				}else{
					const hmacCompare = await verifyHmac({...shop})
					console.log(shop, hmacCompare, 54)
					const hostname = Buffer.from(shop.host, 'base64').toString() 
					console.log(hostname, 57)
					const json = await oAuthRequest(shop.name, shop.code)
					console.log(json, 59)
					return { ...shop, ...json } 
				}
			}else{
				throw new Error('no state')
			}
		}
	}catch(err){
		console.log(err)
		return err
	}
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
