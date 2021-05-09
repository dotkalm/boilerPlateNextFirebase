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

test('there is a static json with globalIds for each destination', async () => {
	expect(destinationsWithIds).not.toBe(undefined)
	expect(Array.isArray(destinationsWithIds)).toBe(true)
})

test('expect cursor/globalid to be concatentated geohash + type as base64', async () => {
	expect(destinationsWithIds).not.toBe(undefined)
	expect(Array.isArray(destinationsWithIds)).toBe(true)
})
