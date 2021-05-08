import requestXml from '../../shared/utils/requestXml'
import orderedParams from '../../shared/orderedParams'
import jsonRecurse from '../../shared/utils/recurse'
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
export const sednaGet = async (baseUrl, paramsObject) => {
	try{

		paramsObject['lg'] = process.env[`SEDNA_LOCALE_${DEFAULT_LOCALE}`]
		paramsObject[SEDNA_AGENT_FIELD] = SEDNA_AGENT
		const params = orderedParams(paramsObject)
		const url = `${baseUrl}${params}`
		const jsonTree = await requestXml(url)
		const data = jsonRecurse(jsonTree, { })
		const [ resultsKey ] = Object.keys(data)
		const results = data[resultsKey]
		const [ resultKey ] = Object.keys(results)
		const result = results[resultKey]
		return result 
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

