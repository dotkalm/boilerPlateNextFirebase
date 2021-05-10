import { getDoc } from '../../../src/server/services/firestoreNode'


test('retrieve data from firestore', async () => {
	const data = await getDoc('region', 'placeholder')
		expect(data === 'not here').toBe(false)
})
