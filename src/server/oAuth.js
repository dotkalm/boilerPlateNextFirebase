export const oAuthRequest = (shop, code) => {
	const body = {
		client_id: process.env.SHOPIFY_API_KEY,
		client_secret: process.env.SHOPIFY_API_SECRET,
		code
	}
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
	const f = await fetch(`https://${shop}.${process.env.SHOPIFY_ACCESS_TOKEN_URL_TAIL}`, request)
	const response = await f.json()
	return response
}
