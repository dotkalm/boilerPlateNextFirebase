import { 
	allBasesAndMarinas 
} from '../../src/server/services/sedna'
import { 
	gisGeocoder, 
	defineGlobalId, 
	defineAndSortGlobalIds 
} from '../../src/server/services/arcgis'
import { geoDecode, geoEncode } from '../../src/shared/utils/geohash'
import destinationsWithIds from '../../src/shared/utils/const/destinationsWithGlobalIds'

const baseObject = new Object
const countryObject = new Object
const regionObject = new Object
const regionSet = new Set()
const countrySet = new Set()
const baseSet = new Set()
const geohashes = new Object

beforeAll(() => {
	for(let i=0; i<destinationsWithIds.length; i++){
		const { region, country, base, marina, lat, lng } = destinationsWithIds[i]
		regionSet.add(region)
		for(let ii=5; ii>0; ii--){
			if(!geohashes[ii]){
				geohashes[ii] = new Set()
			}
			const geohash = geoEncode(lat, lng, ii)
			geohashes[ii].add(geohash)
		}
		if(!regionObject[region]){
			regionObject[region] = new Set()
		}
		regionObject[region].add(region)

		countrySet.add(country)
		if(!countryObject[country]){
			countryObject[country] = new Set()
		}
		countryObject[country].add(country)
	}
	console.log(geohashes)
})

test('there is a static json with globalIds for each destination', async () => {
	expect(destinationsWithIds).not.toBe(undefined)
	expect(Array.isArray(destinationsWithIds)).toBe(true)
})

test('low level geohash set size equals region set size', async () => {
	expect(geohashes[1].size === regionSet.size).toBe(true)
})
