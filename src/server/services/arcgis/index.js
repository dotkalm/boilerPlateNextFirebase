import orderedParams from '../../../shared/utils/orderedParams'
import { getRequest } from '../../../shared/utils/request'
import { geoEncode } from '../../../shared/utils/geohash'
const { 
	GEOCODER_URL,
	DEFAULT_LOCALE
} = process.env

export const geocoder = async (place, type) => {
	try{
		const route = process.env[`GEOCODER_${type.toUpperCase()}`]
		const paramsObject = { f: 'json', langCode: DEFAULT_LOCALE.toLowerCase() }
		if(type === 'location'){
			paramsObject.text = place.text
			paramsObject.maxLocation = 1
		}
		if(type === 'reverse'){
			paramsObject['location'] = place['location']
		}
		const params = orderedParams(paramsObject) 
		const url = `${GEOCODER_URL}${route}${params}`
		const geo = await getRequest(url)
		return geo 
	}catch(err){
		console.log(err)
		return err
	}
}
export const gisGeocoder = async (place, geoHashPrecision) => {
	try{
		const geo = await geocoder(place, 'location')
		console.log(geo)
		const { feature, name } = geo
		const { geometry } = feature
		const { x , y } = geometry 
		const precision = geoHashPrecision ? geoHashPrecision : 6
		const geohash = geoEncode(y, x, precision)
		return { geohash, lat: y, lng: x, gisName: name } 
	}catch(err){
		console.log(err)
		return err
	}
}
