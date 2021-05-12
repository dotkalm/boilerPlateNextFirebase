import { getCollection, updateDoc, addDoc, setDoc, getDoc } from '../../../../src/server/services/firestoreNode'
import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
const { 
	DEFAULT_LOCALE
} = process.env
let data
let companies 
beforeAll(async() => {
	companies = getCollection('charterCompanies', [['limit', undefined, 1]])
	const [ company ] = companies
})

test('retrieve yachts from nausys api using test companies as an iterator with status ok', () => {
	const { status } = data
	expect(status).toBe("OK")
})

test('retrieve yachts from nausys api using test companies as an iterator with a non empty array', () => {
	const { yachts } = data
	expect(yachts.length > 0).toBe(true)
})

test('retrieve yachts from nausys api using test companies as an iterator and return models', async () => {
	const { yachts } = data
	for(let i=0;i<yachts.length;i++){
	}
}, 100000)


