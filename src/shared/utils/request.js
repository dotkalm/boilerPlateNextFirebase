import fetch from 'node-fetch'
import crypto from 'crypto'
export const getRequest = async url => {
	const request = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		mode: 'cors',
		cache: 'default',
	}
	const f = await fetch(url, request)
	const response = await f.json()
	return response
}
export const postRequest = async (url, body) => {
	try{
		const json = JSON.stringify(body)

		const request = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			mode: 'cors',
			cache: 'default',
			body: json
		}
		if(!url){
			request.headers.hmac = crypto.createHmac("sha256", process.env.SHARED_SECRET)
			.update(json)
			.digest("hex")
		}
		const f = await fetch(url ? url : process.env.SERVER_URL, request)
		const response = await f.json()
		return response
	}catch(err){
		return err
	}
}
