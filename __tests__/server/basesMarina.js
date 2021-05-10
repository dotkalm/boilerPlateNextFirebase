import { allBasesAndMarinas } from '../../src/server/services/sedna'
import { gisGeocoder, defineGlobalId, defineAndSortGlobalIds } from '../../src/server/services/arcgis'
import { geoDecode } from '../../src/shared/utils/geohash'
import fs from 'fs'

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



test('a collection of regions can be sorted, and saved as static file', async () => {
	try{
		const destinationsWithGlobalIds = await defineAndSortGlobalIds(data)
		const content = JSON.stringify(destinationsWithGlobalIds)
		fs.writeFile('destinationsWithGlobalIds.json', content, err => {
			if(!err){
				expect(destinationsWithIds).not.toBe(undefined)
				expect(Array.isArray(destinationsWithIds)).toBe(true)
			}else{
				expect(err).toBe(undefined)
				return err
			}
		})
	}catch(err){
		console.log(err)
		return err
	}
}, 15000)
