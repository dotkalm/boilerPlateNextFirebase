import { getNausys } from '../../../../src/server/services/nausys'
import { gisGeocoder } from '../../../../src/server/services/arcgis'
import { setDoc } from '../../../../src/server/services/firestoreNode'

const { DEFAULT_LOCALE } = process.env
let data
const geohashSet = new Set()

beforeAll( async() => {
	data = await getNausys('countries')
	const { status, countries } = data
	for(let i=0; i < countries.length; i++){
		const { code, id, name } = countries[i] 
		const countryName = name[`text${DEFAULT_LOCALE}`]
		const geoData = await gisGeocoder(countryName, 5)
		const { geohash, defaultName, lat, lng } = geoData 
		if(geohashSet.has(geohash)){
			break
		}
		geohashSet.add(geohash)
		const firestoreDoc = {
			nausysCountryId: id,
			geohash,
			locales: {},
			lat,
			lng,
		}
		for(const label in name){
			const lang = label.replace(/text/, '')
			firestoreDoc.locales[lang] = name[label]
		}
		const d = await setDoc('countries', firestoreDoc, code)
		if(d !== 'success'){
			break
		}
	}
}, 1000000)

test('retrieve countries from nausys api', async () => {
	const { status, countries } = data
	expect(status).toBe("OK")
})

