import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
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

test('retrieve locations from nausys api with a non empty array', async () => {
	const { locations } = data
	for(let i=0;i<locations.length;i++){
		const place = locations[i]
		const { name, lat, lon } = place 
		const reverseOnce = await geocoder({ location: `${lon}, ${lat}` }, 'reverse')
		const text = name[`text${DEFAULT_LOCALE}`]
		let { address } = reverseOnce
		if(address.Type === 'Sea'){
			const geo = await geocoder({ text }, 'location')
			const [{ extent, feature }] = geo.locations
			const { geometry, attributes } = feature 
			const { x, y } = geometry
			const reverseAgain = await geocoder({ location: `${x}, ${y}` }, 'reverse')
			address = reverseAgain.address
		}
		console.log(address, text)
		expect(address).not.toBe(undefined)
	}
}, 100000)


