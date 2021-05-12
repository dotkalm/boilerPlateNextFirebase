import { getCollection, updateDoc, addDoc, setDoc, getDoc } from '../../../../src/server/services/firestoreNode'
import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
const { 
	DEFAULT_LOCALE
} = process.env
let data

beforeAll( async() => {
	data = await getNausys('companies')
}, 100000)

test('retrieve companies from nausys api with status ok', () => {
	const { status } = data
	expect(status).toBe("OK")
})

test('retrieve companies from nausys api with a non empty array', () => {
	const { companies } = data
	expect(companies.length > 0).toBe(true)
})

test('retrieve companies from nausys api and return a country ', async () => {
	const { companies } = data
	for(let i=0;i<companies.length;i++){
		const company = companies[i]
		const { id, countryId } = company
		const [ exists ] = await getCollection('charterCompanies', [[ 'nausysCompanyId', '==', id ]])
		if(exists === undefined){
			const [ country ] = await getCollection('countries', [[ 'nausysCountryId', '==', countryId ]])
			expect(country).not.toBe(undefined)
			company.nausysCompanyId = id
			company.nausysCountryId = company.countryId
			company.countryCode = country.uid
			company.countryGeohash = country.geohash
			company.bases = new Array
			company.vendors = ['nausys'] 
			delete company.id
			delete company.countryId
			const addedDoc = await addDoc('charterCompanies', company)
			expect(Array.isArray(company.bases)).toEqual(true)
			expect(typeof(addedDoc)).toEqual('string')
		}else{
			expect(typeof(exists.uid)).toEqual('string')
			expect(Array.isArray(exists.bases)).toEqual(true)
		}
	}
}, 100000)


