import crypto from 'crypto' 
import timingSafeCompare from 'tsscmp'
import jwt from 'jsonwebtoken'
import { getDoc, createUser, setClaims, setDoc } from './firebaseNode'
import { makeQueryString } from '../shared/utils/queryString'
import { shopRegex, httpsRegex } from '../shared/utils/shopifyValidation'
import { oAuthRequest } from './oAuth'

export const verifyHmac = shopData => {
	try{
		const { name } = shopData
		const sansHmac = { ...shopData }  
		delete sansHmac['hmac']
		delete sansHmac['name']
		sansHmac['shop'] = !name ? shopData['shop'] : name
		const unsortedKeys = Object.keys(sansHmac)
		const keys = unsortedKeys.sort()
		const newArray = new Array(keys.length).fill({key: null, value: null})
		for(let i = 0; i < keys.length; i++){
			const key = keys[i] 
			newArray[i] = { key: keys[i], value: sansHmac[key] }
		}
		const qS = makeQueryString(newArray)
		const hmac = Buffer.from(crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
			.update(qS)
			.digest("hex"), 'utf-8')
		const providedHmac = Buffer.from(shopData.hmac, 'utf-8')
		const truth = timingSafeCompare(hmac.toString(), providedHmac.toString())
		return truth
	}catch(err){
		console.log(err)
		throw new Error(err)
	}
}

export const oAuthExchange = async (shop, request) => {
	try{
		const merchant = await getDoc('merchants', shop.name)
		if(merchant && merchant.error){
			throw new Error(merchant.error)
		}else{
			if(merchant && merchant.state){
				const { state } = merchant
				const array = request.headers.referer.split('&')
				const regex = new RegExp('^state=')
				const nonceComponent = array.find(e => e.match(regex))
				const nonce = decodeURIComponent(nonceComponent.replace(regex, ''))
				const compareNonce = timingSafeCompare(state, nonce)
				if(!compareNonce){
					console.log(state, nonce)
					throw new Error('nonce mismatch')
				}else{
					const hmacCompare = verifyHmac(shop)
					const { name } = shop
					const shopRegExp = name.match(shopRegex)
					if(!hmacCompare){
						throw new Error('hmac mismatch')
					}else if(!shopRegExp){
						if(name.match(/^http/)){
							const httpsRegExp = name.match(httpsRegex)
							if(!httpsRegExp){
								throw new Error('bad shopname')
							}
						}else{
							throw new Error('bad shopname')
						}
					}else{
						const json = await oAuthRequest(name, shop.code)
						console.log(json)
						const { access_token, scope } = json 
						const claims = await setClaims(uid, { shop: name }) 
						if(claims !== 'SUCCESS'){
							throw new Error(claims)
						}else{
							console.log(uid, claims, 68)
							return { name, uid}
						}
					}
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
export const nonce = crypto.randomBytes(16).toString('base64') 
export const makeRedirectUrl = name => {
	return `https://${name}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPES}&redirect_uri=${process.env.SHOPIFY_APP_URL}/auth/callback&state=${nonce}`
}
export const decodeSession = async (parent, shop, request) => {
	try{
		if(!verifyHmac(shop)){
			throw new Error('invalid hmac')
		}else{
			const { host } = shop
			const b = Buffer.from(host, 'base64')
			const shopHost = b.toString()
			console.log(shopHost)
		}
	}catch(err){
		console.log(err)
		return err
	}
}
export const beginUser = async (name, valid) => {
	const { uid, jwt } = await createUser({...merchant, ...json})
	return { uid, jwt } 
}
export const checkShop = async (parent, shop, request) => {
	const { name, timestamp, hmac } = shop 
	const merchant = await getDoc('merchants', name)
	if(merchant && !merchant.error){
		const { referer } =  request.header
		console.log(merchant, args.shop, referer, 101)
		return merchant 
	}else if(merchant && merchant.error){
		console.log(shop)
	}
}
