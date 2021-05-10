import fetch from 'node-fetch'
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
		console.log(url)
		const request = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify(body)
		}
		const f = await fetch(url, request)
		const response = await f.json()
		return response
	}catch(err){
		return err
	}
}
