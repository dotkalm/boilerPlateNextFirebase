import { allBasesAndMarinas } from '../../../../src/server/services/sedna'
import { gisGeocoder, defineGlobalId, defineAndSortGlobalIds } from '../../../../src/server/services/arcgis'
import { geoDecode } from '../../../../src/shared/utils/geohash'

let data 
beforeAll(() => {
	return allBasesAndMarinas().then(d => {
		data = d 
		return d
	})
}, 100000)
test('all marinas/bases have baseIds', () => {
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.vendorBaseId).not.toBe(undefined)
		expect(dock.vendorCountryId).not.toBe(undefined)
		expect(dock.vendorRegionId).not.toBe(undefined)
	}
})

test('all marinas/bases have locationStrings', () => {
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.locationString).not.toBe(undefined)
	}
})

