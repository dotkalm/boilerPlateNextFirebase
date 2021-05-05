import fetch from 'node-fetch'
import { xmlHttpRequest } from 'xmlhttprequest'
import decodeXml from '../shared/utils/decodeXml'


export const getRequest = async (apiRoute, methodRoute, paramsObject) => {
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
		const { SEDNA_DOMAIN, SEDNA_AGENT_FIELD, SEDNA_AGENT, SEDNA_LOCALE_EN } = process.env
		paramsObject[SEDNA_AGENT_FIELD] = SEDNA_AGENT
		paramsObject['lg'] = SEDNA_LOCALE_EN 

		const params = new URLSearchParams()
		for(const key in paramsObject){
			params.append( key, paramsObject[key] )
		}
		params.sort()
		const baseUrl = [SEDNA_DOMAIN, apiRoute, methodRoute].join('')
		const url = `${baseUrl}?${params.toString()}`
		const f = await fetch(url, request)
		const response = await f.text()
		const json = decodeXml(response)
		console.log(json)
		return json 
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

