import requestXml from '../../shared/utils/requestXml'
import orderedParams from '../../shared/utils/orderedParams'
import jsonRecurse from '../../shared/utils/recurse'
import { getCollection, addDoc } from './firestoreNode'
import { gisGeocoder } from './arcgis'
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
		const baseArray = await getCollection('destinations', [[ 'vendors', 'array-contains', 'sedna' ]])
		if(baseArray.length === 0){
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
							marinasAndBases.push({ vendorMarinaId: id_marina, marina: name })
						}else{
							marinasAndBases.push({ vendorBaseId: id_base, base: name })
						}
					}else{
						const index = marinasAndBases.findIndex(e => e.marina === marina.name)
						marinasAndBases[index].vendorBaseId = id_base 
						marinasAndBases[index].base = destination.name
					}
				}else{
					if(id_country){
						if(!Array.isArray(base)){
								const index = marinasAndBases.findIndex(e => e.vendorBaseId === base.id_base)	
								marinasAndBases[index].vendorCountryId = id_country 
								marinasAndBases[index].country = name
						}else{
							let index = 0
							for(let i = 0; i < base.length; i++){
								index = marinasAndBases.findIndex(e => e.vendorBaseId === base[i].id_base)
								marinasAndBases[index].vendorCountryId = id_country 
								marinasAndBases[index].country = name
							}
						}
					}else{
						if(id_dest){
							if(!Array.isArray(country)){
								const index = marinasAndBases.findIndex(e => e.vendorCountryId === country.id_country)
								marinasAndBases[index].vendorRegionId = id_dest
								marinasAndBases[index].region = name
							}else{
								for(let i = 0; i < country.length; i++){
									const cid = country[i].id_country
									const b = country[i].base
									const shallow = marinasAndBases.filter(e => e.vendorCountryId === cid)
									shallow.forEach(element => {
										const index = marinasAndBases.findIndex(e => e === element)
										marinasAndBases[index].vendorRegionId = id_dest
										marinasAndBases[index].region = name 
									})
								}
							}
						}
					}
				}
			}
			await sednaGet(url, params, marinasAndBasesCallback)
			const vendorMap = new Object
			for(let i=0; i < marinasAndBases.length; i++){
				const { marina, base, country, region } = marinasAndBases[i]
				const idArray = Object.keys(marinasAndBases[i]).filter(e => e.match(/^vendor/))
				const arrayKeys = ['country', 'base', 'marina']
				for(let idIndex = 0; idIndex < idArray.length; idIndex ++){
					const key = idArray[idIndex]
					const assetKey = key.replace('vendor','').toLowerCase().replace(/id$/,'')
					const value = marinasAndBases[i][key]
					const asset = marinasAndBases[i][assetKey]
					const arrayKeys2 = [ ...arrayKeys ].splice(arrayKeys.indexOf(assetKey))
					const array2 = arrayKeys2.splice(arrayKeys.indexOf(assetKey))
					const locationString = arrayKeys2.map(k => marinasAndBases[i][k]).reverse().join(', ')
					if(!vendorMap[assetKey]){
						vendorMap[assetKey] = new Object
					}
					if(!vendorMap[assetKey][asset]){
						const newKey = key.replace('vendor', 'sedna')
						const [ firstResult ] = await getCollection(assetKey, [[newKey, '==', value]])
						if(!firstResult){
							const loc = await gisGeocoder(locationString === '' ? asset : locationString, 4)
							const { geohash, lat, lng, gisName } = loc 
							const oo = { geohash, coords: { lat, lng },  sednaName: asset, arcgisName: gisName } 
							oo[newKey] = value
							oo.vendors = ['sedna']
							if(assetKey === 'marina'){
								oo.base = marinasAndBases[i].base
								oo.country = marinasAndBases[i].country
								oo.region = marinasAndBases[i].region
							}
							if(assetKey === 'base'){
								oo.country = marinasAndBases[i].country
								oo.region = marinasAndBases[i].region
							}
							if(assetKey === 'country'){
								oo.region = marinasAndBases[i].region
							}
							vendorMap[assetKey][asset] = oo
							await addDoc(assetKey, oo)
						}else{
							vendorMap[assetKey][asset] = firstResult
						}
					}
				}
				if(!marina){
					marinasAndBases[i].locationString = [base, country].join(', ') 
				}else{
					marinasAndBases[i].locationString = [marina, base, country].join(', ') 
				}
				const { locationString } = marinasAndBases[i]	
				marinasAndBases[i].locationString = locationString
			}
			return marinasAndBases 
		}else{
			return baseArray
		}
	}catch(err){
		console.log(err)
		return err
	}
}
