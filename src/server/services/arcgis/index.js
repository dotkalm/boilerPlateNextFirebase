import orderedParams from '../../../shared/utils/orderedParams'
import { getRequest } from '../../../shared/utils/request'
import { geoEncode } from '../../../shared/utils/geohash'
const { GEOCODER_URL } = process.env
export const geocoderQueryOne = async place => {
	const params = orderedParams({
		f: 'json',
		text: place,
		maxLocation: 1 
	}) 
	const url = `${GEOCODER_URL}${params}`
	const geo = await getRequest(url)
	const [ result ] = geo.locations
	return result 
}
export const gisGeocoder = async (place, geoHashPrecision) => {
	try{
		const geo = await geocoderQueryOne(place)
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

export const defineGlobalId = async element => {
	const { locationString } = element 
	const place = await gisGeocoder(locationString)
	return { ...element, ...place } 
}

export const defineAndSortGlobalIds = data => Promise.all(data.map(e => defineGlobalId(e)))
	.then(newArray => newArray.sort((x,y) => x.geohash < y.geohash ? -1 : 1))
