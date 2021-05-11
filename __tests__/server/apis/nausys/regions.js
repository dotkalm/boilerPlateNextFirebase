import { getNausys } from '../../../../src/server/services/nausys'
import { gisGeocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
import { getCollection, updateDoc, addDoc, setDoc } from '../../../../src/server/services/firestoreNode'
const { 
	DEFAULT_LOCALE
} = process.env
let data

beforeAll( async() => {
	data = await getNausys('regions')
	const { regions } = data
	for(let i=0;i<regions.length;i++){
		const { id, name, countryId } = regions[i]
		const [ country ] = await getCollection('countries', [['nausysCountryId', '==', countryId]])
		const { uid, locales, geohash } = country 
		const province = name[`text${DEFAULT_LOCALE}`]
		const countryName = locales[DEFAULT_LOCALE] 
		const g = await gisGeocoder(`${province} ${countryName}`, 6)
		g.nausysCountryId = countryId
		g.nausysRegionId = id
		g.vendors = [ 'nausys' ] 
		g.locales = {}
		for(const label in name){
			const loc = label.replace('text','')
			g.locales[loc] = name[label]
		}
		g.countryCode = uid
		g.country = countryName 
		g.countryGeohash = geohash
		if(!country.vendors || country.vendors && !country.vendors.find(e => e === 'nausys')){
			await updateDoc('countries', { vendors: [ 'nausys' ] }, uid)
		}
		await setDoc('provinces', g, g.geohash)
	}
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
