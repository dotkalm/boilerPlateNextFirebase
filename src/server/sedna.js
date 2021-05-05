export const jsonRequest = async () => {
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
	const f = await fetch(`https://`, request)
	const response = await f.json()
	return response
}

