import fetch from 'node-fetch'
import decodeXml from './decodeXml'
const requestXml = async url => {
	const request = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/xml',
			'Accept': 'application/xml',
		},
		mode: 'cors',
		cache: 'default',
	}
	const f = await fetch(url, request)
	const response = await f.text()
	return decodeXml(response)
}
export default requestXml
