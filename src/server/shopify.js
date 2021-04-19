import { parseUrl } from '../actions/url'
const openDoor = async url => {
	const params = parseUrl(url)
	if(params != null){
		const { hmac } = params
		console.log(hmac)
	}
}

