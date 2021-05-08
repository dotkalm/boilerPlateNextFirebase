import orderedParams from '../../../shared/utils/orderedParams'
import { getRequest } from '../../../shared/utils/request'
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
