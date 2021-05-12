import { getCollection, updateDoc, addDoc, setDoc, getDoc } from '../../../../src/server/services/firestoreNode'
import { getNausys } from '../../../../src/server/services/nausys'
import { geocoder } from '../../../../src/server/services/arcgis'
import { geoEncode } from '../../../../src/shared/utils/geohash'
const { 
	DEFAULT_LOCALE
} = process.env
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

test('retrieve bases from nausys api and return a country ', async () => {
	const { bases } = data
	for(let i=0;i<bases.length;i++){
		const base = bases[i]
		const { id, countryId, lat, lon, locationId, companyId } = base
		const [ exists ] = await getCollection('bases', [ 
			[ 'nausyscompanyId', '==', companyId], 
			[ 'nausysLocationId', '==', locationId],
			['limit', undefined, 1] 
		]).catch(err => console.log(err))
		if(exists === undefined){
			const geohash = geoEncode(lat, lon, 7)
			const [ location ] = await getCollection('locations', [ [ 'nausysLocationId', '==', locationId], ['limit', undefined, 1] ])
				.catch(err => console.log(err))
			expect(location).not.toBe(undefined)
			const { uid, countryCode } = location
			base.countryCode = countryCode
			base.location = uid
			base.nausysLocationId = locationId
			base.nausysCompanyId = companyId
			const [ company ] = await getCollection('charterCompanies', [ [ 'nausysCompanyId', '==', companyId ], ['limit', undefined, 1] ])
			expect(company).not.toBe(undefined)
			base.companyUid = company.uid
			delete base.id
			delete base.companyId
			delete base.locationId
			const addedDocId = await addDoc('bases', base)
			expect(Array.isArray(company.bases)).toEqual(true)
			expect(typeof(addedDocId)).toEqual('string')
			const basesArray = company.bases
			basesArray.push(addedDocId)
			const msg = await updateDoc('charterCompanies', { bases: basesArray }, company.uid) 
			expect(msg).toEqual('success')
		}else{
			expect(exists.companyUid).not.toBe(undefined)
		}

	}
}, 100000)


