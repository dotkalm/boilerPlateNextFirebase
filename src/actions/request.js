export const defaultOptions = idToken => (
	{
		'Authorization': `Bearer ${idToken}`,
		'Accept': 'application/json',
	}
)

export const endpoint = (path, options) => `${ url }/${ path }${ queryParams(options) }`

export const queryParams = (options = { }) => {
	const params = Object.keys(options).reduce( (paramsArray, key) => {
		paramsArray.push(`${ key }=${ options[key] }`)
		return paramsArray
	}, [])

	return params.length > 0 ? `?${ params.join('&') }` : ''
}
export const getRequest = (idToken, query) => {
	return (idToken !== null ? ({
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': idToken,
			'Accept': 'application/json',
		},
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify({ 'query': query })
	}) : ({

		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify({ 'query': query })
	}) 
	)
}
