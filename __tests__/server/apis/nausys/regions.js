import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
const { 
	DEFAULT_LOCALE
} = process.env
let data

beforeAll( async() => {
	data = await getNausys('regions')
	console.log(data)
}, 100000)

test('retrieve locations from nausys api with status ok', () => {
	const { status } = data
	expect(status).toBe("OK")
})

test('retrieve locations from nausys api with a non empty array', () => {
	const { regions } = data
	expect(regions.length > 0).toBe(true)
})

test('retrieve locations from nausys api with a non empty array', () => {
	const { regions } = data
	expect(regions.length > 0).toBe(true)
})
