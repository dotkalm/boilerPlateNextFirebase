import requestXml from '../../shared/utils/requestXml'
import orderedParams from '../../shared/utils/orderedParams'
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
export const sednaGet = async (baseUrl, paramsObject, callback) => {
	try{
		paramsObject['lg'] = process.env[`SEDNA_LOCALE_${DEFAULT_LOCALE}`]
		paramsObject[SEDNA_AGENT_FIELD] = SEDNA_AGENT
		const params = orderedParams(paramsObject)
		const url = `${baseUrl}${params}`
		const jsonTree = await requestXml(url)
		const data = jsonRecurse(jsonTree, { }, callback)
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
export const allBasesAndMarinas = async () => {
	try{
		const url = sednaRoute('destinations')
		const params = {}
		const marinasAndBases = new Array()
		const marinasAndBasesCallback = destination => {
			const { 
				id_dest,
				country,
				id_base, 
				id_marina, 
				marina, 
				name, 
				id_country, 
				base 
			} = destination
			if(id_base || id_marina){
				if(!marina){
					if(id_marina){
						marinasAndBases.push({ name, marinaId: id_marina })
					}else{
						marinasAndBases.push({ name, baseId: id_base })
					}
				}else{
					const index = marinasAndBases.findIndex(e => e.name === marina.name)
					marinasAndBases[index].baseId = id_base 
					marinasAndBases[index].baseName = destination.name
				}
			}else{
				if(id_country){
					if(!Array.isArray(base)){
							const index = marinasAndBases.findIndex(e => e.baseId === base.id_base)	
							marinasAndBases[index].countryId = id_country 
							marinasAndBases[index].countryName = name
					}else{
						let index = 0
						for(let i = 0; i < base.length; i++){
							index = marinasAndBases.findIndex(e => e.baseId === base[i].id_base)
							marinasAndBases[index].countryId = id_country 
							marinasAndBases[index].countryName = name
						}
					}
				}else{
					if(id_dest){
						if(!Array.isArray(country)){
							const index = marinasAndBases.findIndex(e => e.countryId === country.id_country)
							marinasAndBases[index].regionId = id_dest
							marinasAndBases[index].regionName = name
						}else{
							for(let i = 0; i < country.length; i++){
								const cid = country[i].id_country
								const b = country[i].base
								const shallow = marinasAndBases.filter(e => e.countryId === cid)
								shallow.forEach(element => {
									const index = marinasAndBases.findIndex(e => e === element)
									marinasAndBases[index].regionId = id_dest
									marinasAndBases[index].region = name 
								})
							}
						}
					}
				}
			}
		}
		return sednaGet(url, params, marinasAndBasesCallback).then(() => marinasAndBases)
		.catch(err => console.log(err))
	}catch(err){
		console.log(err)
		return err
	}
}
