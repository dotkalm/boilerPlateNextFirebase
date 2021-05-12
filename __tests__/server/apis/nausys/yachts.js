import { getCollection, updateDoc, addDoc, setDoc, getDoc } from '../../../../src/server/services/firestoreNode'
import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
const { 
	DEFAULT_LOCALE
} = process.env
let data
beforeAll(async () => {
	const companies = await getCollection('charterCompanies', [['limit', null, 1]])
	console.log(companies)
	const [ company ] = companies 
	const { nausysCompanyId } = company
	data = await getNausys('yachts', nausysCompanyId)
	data = { companies, data } 
}, 200000)

test('retrieve companies array from charterCompanies table with single row', () => {
	console.log(data)
	const { companies } = data 
	expect(companies.length).toEqual(1)
})

test('retrieve yachts from nausys api using test companies as an iterator with status ok', async () => {
	console.log(data)
	const { status } = data.data
	expect(status).toBe("OK")
})

test('retrieve yachts from nausys api using test companies as an iterator with a non empty array', async () => {
	console.log(data)
	const { yachts } = data.data
	console.log(yachts)
	expect(yachts.length > 0).toBe(true)
})

test('retrieve yachts from nausys api using test companies as an iterator and return models', async () => {
	console.log(data)
	const { yachts } = data.data
	for(let i=0;i<yachts.length;i++){
		const yacht = yachts[i] 
		console.log(yacht)
		expect(yachts.length > 0).toBe(true)
	}
})
