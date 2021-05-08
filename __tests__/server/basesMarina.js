import { allBasesAndMarinas } from '../../src/server/services/sedna'
import { gisGeocoder, defineGlobalId, defineGlobalIds } from '../../src/server/services/arcgis'
import { geoDecode } from '../../src/shared/utils/geohash'

let data 
beforeAll(() => {
	return allBasesAndMarinas().then(d => {
		data = d
		return d
	})
})
test('all marinas/bases have baseIds', () => {
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.baseId).not.toBe(undefined)
		expect(dock.countryId).not.toBe(undefined)
		expect(dock.regionId).not.toBe(undefined)
	}
})

test('all marinas/bases have countryIds', () => {
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
	}
})
test('all marinas/bases have regionIds', () => {
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
	}
})
test('all marinas/bases have locationStrings', () => {
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.locationString).not.toBe(undefined)
	}
})
test('a locationString can return coordinates', async () => {
	const [ dock ] = data 
	const { locationString } = dock
	const place = await gisGeocoder(locationString)
	expect(place).not.toBe(undefined)
})

test('a geohash can be decoded into lat lng within .0000001 accuracy', async () => {
	const [ dock ] = data 
	const place = await defineGlobalId(dock)
	const { geohash, lat, lng } = place
	const result = geoDecode(geohash)
	expect(place).not.toBe(undefined)
	const yDif = Math.abs(result.lon - lng)
	const xDif = Math.abs(result.lat - lat)
	expect(yDif < .0000001).toBe(true)
	expect(xDif < .0000001).toBe(true)
})

test('a collection of regions can be sorted', async () => {
	const newArray = await defineGlobalIds(data)
	expect(newArray).not.toBe(undefined)
})
