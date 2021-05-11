import { getCollection, updateDoc, addDoc, setDoc, getDoc } from '../../../../src/server/services/firestoreNode'
import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
const { 
	DEFAULT_LOCALE
} = process.env
let data

beforeAll( async() => {
	data = await getNausys('locations')
}, 100000)

test('retrieve locations from nausys api with status ok', () => {
	const { status } = data
	expect(status).toBe("OK")
})

test('retrieve locations from nausys api with a non empty array', () => {
	const { locations } = data
	expect(locations.length > 0).toBe(true)
})

test('retrieve locations from nausys api, geohash, merge w existing vendors', async () => {
	const { locations } = data
	for(let i=0;i<locations.length;i++){
		const place = locations[i]
		let latitude, longitude
		const { name, lat, lon, id, regionId } = place 
		const reverseOnce = await geocoder({ location: `${lon}, ${lat}` }, 'reverse')
		const text = name[`text${DEFAULT_LOCALE}`]
		let { address } = reverseOnce
		latitude = lat
		longitude = lon
		if(address.Type === 'Sea'){
			const geo = await geocoder({ text }, 'location')
			const [{ extent, feature }] = geo.locations
			const { geometry, attributes } = feature 
			const { x, y } = geometry
			const reverseAgain = await geocoder({ location: `${x}, ${y}` }, 'reverse')
			latitude = y
			longitude = x
			address = reverseAgain.address
		}
		const geohash = geoEncode(latitude, longitude, 7)
		const g = { 
			nausysLocationId: id,
			nausysRegionId: regionId,
			countryCode: address.CountryCode,
			address: address.LongLabel,
			locales: {},
			defaultName: text,
			geohash,
		} 
		for(const label in name){
			const loc = label.replace('text','')
			g.locales[loc] = name[label]
		}
		const exists = await getDoc('locations', geohash)
		if(exists === 'not here'){
			g.vendors = ['nausys']
			await setDoc('locations', g, geohash)
		}else{
			if(exists.vendors && !exists.vendors.find(e => e === 'nausys')){
				const updateObj = {
					vendors: [...exists.vendors, 'nausys'],
					...g
				}
				await updateDoc('locations', updateObj, geohash)
			}
		}

		console.log(g)
		expect(address).not.toBe(undefined)
		expect(geohash).not.toBe(undefined)
	}
}, 100000)


