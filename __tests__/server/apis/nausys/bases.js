import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'

let data

beforeAll( async() => {
	data = await getNausys('bases')
}, 100000)

test('retrieve bases from nausys api with status ok', () => {
	const { status } = data
	expect(status).toBe("OK")
})

test('retrieve bases from nausys api with a non empty array', () => {
	const { bases } = data
	expect(bases.length > 0).toBe(true)
})

test('retrieve bases from nausys api with a non empty array', async () => {
	const { bases } = data
	for(let i=0;i<bases.length;i++){
		const base = bases[i]
		const { lat, lon } = base
		const reversed = await geocoder({ location: `${lon}, ${lat}` }, 'reverse')
		console.log(reversed, base)
		expect(reversed).not.toBe(undefined)
	}
}, 100000)


