import { getNausys } from '../../../../src/server/services/nausys'
import { gisGeocoder } from '../../../../src/server/services/arcgis'
import { setDoc } from '../../../../src/server/services/firestoreNode'

const { DEFAULT_LOCALE } = process.env
let data

beforeAll( async() => {
	data = await getNausys('countries')
	const { status, countries } = data
	for(let i=0; i < countries.length; i++){
		const { code, id, name } = countries[i] 
		const countryName = name[`text${DEFAULT_LOCALE}`]
		const geoData = await gisGeocoder(countryName)
		console.log(geoData)
	}
}, 1000000)

test('retrieve countries from nausys api', async () => {
	const { status, countries } = data
	expect(status).toBe("OK")
})

