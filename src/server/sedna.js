import fetch from 'node-fetch'

console.log(process.env)
export const getRequest = async () => {
	try{
		const request = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/xml',
				'Accept': 'application/xml',
			},
			mode: 'cors',
			cache: 'default',
		}
		const url = process.env.SEDNA_DOMAIN 
		const f = await fetch(url, request)
		const response = await f.text()
		return response
	}catch(err){
		return err
	}
}
export const postRequest = async () => {
	try{
		const body = { }
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
		const f = await fetch(`https://www.google.com`, request)
		const response = await f.text()
		return response
	}catch(err){
		return err
	}
}

