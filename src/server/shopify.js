const { parseUrl }  = require('../actions/url')

const openDoor = url => {
	const params = parseUrl(url)
	if(params != null){
		const { hmac } = params
		console.log(hmac, params,7)
	}
}
exports.openDoor = openDoor

