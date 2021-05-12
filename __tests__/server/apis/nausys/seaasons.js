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
	data = await getNausys('seasons', nausysCompanyId)
	data = { companies, data } 
}, 200000)

test('retrieve companies array from charterCompanies table with single row', () => {
	const { companies } = data 
	expect(companies.length).toEqual(1)
})

test('retrieve seasons from nausys api using test companies as an iterator with status ok', async () => {
	const { status } = data.data
	expect(status).toBe("OK")
})

test('retrieve seasons from nausys api using non empty array test companies as an iterator', async () => {
	const { seasons } = data.data
	console.log(seasons)
	expect(seasons.length > 0).toBe(true)
})

test('retrieve seasons from nausys api using test companies as an iterator and return models', async () => {
	console.log(data)
	const { seasons } = data.data
	for(let i=0;i<seasons.length;i++){
		const season = seasons[i] 
		console.log(season)
		expect(seasons.length > 0).toBe(true)
	}
})
