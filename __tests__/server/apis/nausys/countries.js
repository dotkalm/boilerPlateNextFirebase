import { getNausys } from '../../../../src/server/services/nausys'
import { gisGeocoder } from '../../../../src/server/services/arcgis'

const { DEFAULT_LOCALE } = process.env
let data

beforeAll( async() => {
	data = await populateDB('countries')
	console.log(data)
	const { status, countries } = data
	for(let i=0; i < countries.length; i++){
		console.log(countries[i], i)
		const { name } = countries[i] 
		const countryName = name[`text${DEFAULT_LOCALE}`]
		const geocodeData = await gisGeocoder(countryName, 4)
		console.log(geocodeData)
	}
}, 1000000)

test('retrieve countries from nausys api', async () => {
	const { status, countries } = data
	expect(status).toBe("OK")
})

