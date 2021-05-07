import fetch from 'node-fetch'
import { xmlHttpRequest } from 'xmlhttprequest'
import decodeXml from '../../shared/utils/decodeXml'
import orderedParams from '../../shared/orderedParams'

const { 
	SEDNA_API_DOMAIN, 
	SEDNA_API_ROUTE, 
	SEDNA_DESTINATIONS_ROUTE,
	SEDNA_AGENT_FIELD,
	SEDNA_AGENT,
	DEFAULT_LOCALE,
} = process.env

export const sednaRoute = apiRoute => {
	const apiMap = {
		'destinations': SEDNA_DESTINATIONS_ROUTE 
	}
	return [ SEDNA_API_DOMAIN, SEDNA_API_ROUTE, apiMap[apiRoute] ].join('')
}
export const getXmlRequest = async (baseUrl, paramsObject) => {
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

		paramsObject['lg'] = process.env[`SEDNA_LOCALE_${DEFAULT_LOCALE}`]
		paramsObject[SEDNA_AGENT_FIELD] = SEDNA_AGENT
		const params = orderedParams(paramsObject)
		const url = `${baseUrl}${params}`
		const f = await fetch(url, request)
		const response = await f.text()
		const decoded = decodeXml(response)
		console.log(decoded)
		return decoded
	}catch(err){
		console.log(err)
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

