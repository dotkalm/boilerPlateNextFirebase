import { 
	allBasesAndMarinas 
} from '../../src/server/services/sedna'
import { 
	gisGeocoder, 
	defineGlobalId, 
	defineAndSortGlobalIds 
} from '../../src/server/services/arcgis'
import { geoDecode } from '../../src/shared/utils/geohash'
import destinationsWithIds from '../../src/shared/utils/const/destinationsWithGlobalIds'

const baseObject = new Object
const countryObject = new Object
const regionObject = new Object
const regionSet = new Set()
const countrySet = new Set()
const baseSet = new Set()

beforeAll(() => {
	for(let i=0; i<destinationsWithIds.length; i++){
		const { region, country, base, marina } = destinationsWithIds[i]
		if(!regionObject[region]){
			regionObject[region] = new Set()
		}
		regionObject[region].add(region)

		if(!countryObject[country]){
			countryObject[country] = new Set()
		}
		countryObject[country].add(country)
	}
	console.log(regionObject, countryObject)
})

test('there is a static json with globalIds for each destination', async () => {
	expect(destinationsWithIds).not.toBe(undefined)
	expect(Array.isArray(destinationsWithIds)).toBe(true)
})

test('region set size equals 3', async () => {
	expect(regionSet.size === 3).toBe(true)
})

test('country set size equals 3', async () => {
	expect(countrySet.size === 8).toBe(true)
})
